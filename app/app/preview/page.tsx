"use client";

import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Badge } from "@/components/ui/badge";

// import * as DropboxSign from "@dropbox/sign";

export default function App() {
  const containerRef = useRef(null);
  const { toast } = useToast();
  //singature request api
  // const signatureRequestApi = new DropboxSign.SignatureRequestApi();

  // // Configure HTTP basic authorization: api_key
  // signatureRequestApi.username = process.env.DROPBOX_SIGN_KEY
  //   ? process.env.DROPBOX_SIGN_KEY
  //   : "";

  useEffect(() => {
    const container = containerRef.current;
    let PSPDFKit: any;
    (async function () {
      PSPDFKit = await import("pspdfkit");
      await PSPDFKit.load({
        container,
        document: "/INV.pdf",
        baseUrl: `${window.location.protocol}//${window.location.host}/`,
      });
    })();

    return () => PSPDFKit && PSPDFKit.unload(container);
  }, []);

  // Define an interface for email pairs
  interface EmailPair {
    username: string;
    email: string;
  }

  interface FieldElements {
    title: string;
    subject: string;
    message: string;
  }

  const initialValues: EmailPair = {
    username: "",
    email: "",
  };

  const initialFields: FieldElements = {
    title: "",
    subject: "",
    message: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    subject: Yup.string().required("Subject is required"),
    message: Yup.string().required("Message is required"),
  });

  const signatorySchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    username: Yup.string().required("Name is required"),
  });

  const [emailPairs, setEmailPairs] = useState<EmailPair[]>([]);

  // handle email pair validation
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    form: any
  ) => {
    if (e.key === "Enter") {
      const { username, email } = form.values;
      if (validationSchema.isValidSync({ username, email })) {
        const newEmailPair: EmailPair = { username, email };
        setEmailPairs([...emailPairs, newEmailPair]);
        form.setFieldValue("name", "");
        form.setFieldValue("email", "");
      }
    }
  };

  const removeEmailPair = (index: number) => {
    const newEmailPairs = [...emailPairs];
    newEmailPairs.splice(index, 1);
    setEmailPairs(newEmailPairs);
  };

  const handleSubmit = async (values: EmailPair) => {
    console.log("ddd", emailPairs);
    const { username, email } = values;

    const newEmailPair: EmailPair = { username, email };
    setEmailPairs([...emailPairs, newEmailPair]);
  };

  // update list of signers
  // const signer1: DropboxSign.SubSignatureRequestSigner = {
  //   emailAddress: "jack@example.com",
  //   name: "Jack",
  //   order: 0,
  // };

  useEffect(() => {
    let order = 0; // Initialize the order
    const signers = emailPairs.map((pair) => {
      const signer = {
        emailAddress: pair.email,
        name: pair.username,
        order: order++,
      };
      return signer;
    });

    console.log(signers);
  }, [emailPairs]);

  const handleSend = async () => {
    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      Authorization:
        "Basic ",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      title: "NDA with Acme Co.",
      subject: "The NDA we talked about",
      message:
        "Please sign this NDA and then we can discuss more. Let me know if you\nhave any questions.",
      signers: [
        {
          email_address: "miracleficient@gmail.com",
          name: "Miracle Is The Best",
          order: 0,
        },
        {
          email_address: "victorytuduo.dev@gmail.com",
          name: "Victory",
          order: 1,
        },
      ],
      cc_email_addresses: ["lawyer@dropboxsign.com"],
      file_urls: [
        "https://www.dropbox.com/s/ad9qnhbrjjn64tu/mutual-NDA-example.pdf?dl=1",
      ],
      metadata: {
        custom_id: 1234,
        custom_text: "NDA #9",
      },
      signing_options: {
        draw: true,
        type: true,
        upload: true,
        phone: false,
        default_type: "draw",
      },
      test_mode: true,
    });

    let reqOptions = {
      url: "https://api.hellosign.com/v3/signature_request/send",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };

    let response = await axios.request(reqOptions);
    console.log(response.data);
  };

  return (
    <>
      {/* Save and Send Button */}
      <div className="signatory-save">
        <Button
          variant={"outline"}
          onClick={() => {
            toast({
              title: "Save complete",
              description: "Your file has been saved.",
            });
          }}
        >
          Save
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Save and Send</Button>
          </DialogTrigger>
          <DialogContent className="w-[425px] md:w-[1200px]">
            <DialogHeader>
              <DialogTitle>Send File to Signatories</DialogTitle>
              <DialogDescription>
                Enter the neccessary details for the signatories.
              </DialogDescription>
            </DialogHeader>
            <Formik
              initialValues={initialFields}
              validationSchema={validationSchema}
              onSubmit={handleSend}
            >
              <Form className="form ">
                <div className="grid gap-4 py-4">
                  <div className="signatory-info">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Field
                      id="title"
                      name="title"
                      className="col-span-3 signatory-fields w-full"
                    />
                  </div>
                  <div className="signatory-info">
                    <Label htmlFor="subject" className="text-right">
                      Subject
                    </Label>
                    <Field
                      id="subject"
                      name="subject"
                      className="col-span-3 signatory-fields w-full"
                    />
                  </div>
                  <div className="signatory-info">
                    <Label htmlFor="message" className="text-right">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      className="col-span-3"
                    />
                  </div>
                  {/* Mail and username value pairs */}
                  <div>
                    <div>
                      {emailPairs.map((pair: EmailPair, index: number) => (
                        <Badge
                          variant="outline"
                          key={index}
                          className="email-pair"
                        >
                          {pair.username} - {pair.email}{" "}
                          <button
                            type="button"
                            className="remove-button"
                            onClick={() => removeEmailPair(index)}
                          >
                            x
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <Formik
                      initialValues={{ username: "", email: "" }}
                      validationSchema={signatorySchema}
                      onSubmit={(values, formikBag) => {
                        const { username, email } = values;
                        if (signatorySchema.isValidSync({ username, email })) {
                          const newEmailPair: EmailPair = { username, email };
                          setEmailPairs([...emailPairs, newEmailPair]);
                          formikBag.resetForm(); // Clear the form fields
                        }
                      }}
                    >
                      {(formikProps) => (
                        <Form
                          onSubmit={formikProps.handleSubmit}
                          className="signatory-form"
                        >
                          <Field
                            type="text"
                            name="username"
                            className="signatory-fields"
                            id="username"
                            placeholder="Enter name"
                            onKeyDown={(e: any) =>
                              handleKeyDown(e, formikProps)
                            }
                          />
                          <ErrorMessage
                            name="username"
                            component="div"
                            className="error"
                          />
                          <Field
                            type="text"
                            name="email"
                            className="signatory-fields"
                            id="email"
                            placeholder="Enter email"
                            onKeyDown={(e: any) =>
                              handleKeyDown(e, formikProps)
                            }
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="error"
                          />
                          <Button
                            type="submit"
                            variant={"ghost"}
                            onClick={() => formikProps.submitForm()}
                          >
                            Add
                          </Button>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </Form>
            </Formik>
            <DialogFooter>
              <Button type="submit">
                Send
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div ref={containerRef} style={{ height: "100vh" }} />
      <Toaster />
      <style global jsx>
        {`
          * {
            margin: 0;
            padding: 0;
          }
        `}
      </style>
    </>

  )
}
