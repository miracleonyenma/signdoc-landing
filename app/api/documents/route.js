import { getServerSession } from "next-auth";
import Document from "../../../server/models/Document";
import connectDB from "../../../server/utils/mongodb";
import { authOptions } from "@/utils/authOptions";
import * as yup from 'yup';
import {handleUpload} from '../../../server/utils/cloudinary'

export const GET = connectDB(async (req, res) => {
  const session = await getServerSession(authOptions);
  if(!session) return new Response("Unauthorized access detected", { status: 401})
  try {
    const document = await Document.findOne(req.body.id)
    if(document.email !== session.user.email) return new Response("Unable to access document", {status: 403})
    return new Response(JSON.stringify(document), {status: 200, headers: {'content-type': 'application/json'}})
  }catch (err) {
    console.log(err, 'Error occurred while fetching document');
    new Response("Internal Server Error", {status: 500})
  }
})

export const POST = connectDB(async (req) => {
  const session = await getServerSession(authOptions)
  if(!session) return new Response("Unauthorized access detected", { status: 401})

  const FILE_MAX_SIZE = 1024 * 1024 * 5 // 5mb

  const shema = yup.object({
    name: yup.string().required('"name" is required'),
    description: yup.string()
  })

  const docSchema = yup.mixed().required('File must be included')
  .test('type','"File should be one of the following format: .doc, .pdf', (file) => {
    return (
      file.type === "application/pdf" ||
      file.type === "application/msword"
    )
  })
  .test('fileSize', 'File should not be greater than 5MB', (file => {
    return file.size <= FILE_MAX_SIZE
  }))
    
  try {
    const formData = await req.formData()
    const name = formData.get('name')
    const description = formData.get('description')    
    const file = formData.get('doc')

    const body = {}
    if(name) body.name = name
    if(description) body.description = description

    await shema.validate(body)
    await docSchema.validate(file)

    let buffer;

    if (file instanceof Blob) {
      // Convert file to stream
      const stream = file.stream();

      // Convert stream to buffer
      const chunks = [];
      for await (const chunk of stream) {
        chunks.push(chunk);
      }
      buffer = Buffer.concat(chunks);
    }

    const b64 = Buffer.from(buffer).toString("base64");
    const dataURI = "data:" + file.type + ";base64," + b64;
    const cldRes = await handleUpload(dataURI)
    const fileURL = cldRes.secure_url

    const document = await Document.create({
      name: name, 
      email: session.user.email,
      description: description,
      file_url: fileURL
    })

    return new Response(JSON.stringify(document), {status: 200, headers: {'content-type': 'application/json'}})
  }catch (err) {
    console.log(err, 'Error occurred while fetching document');
    if (err instanceof yup.ValidationError) {
      return new Response(err.message, {status: 422})
    }
    new Response("Internal Server Error", {status: 500})
  }
})