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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { useActiveDocumentContext } from "@/context/AppContext";

// import * as DropboxSign from "@dropbox/sign";

export default function App() {
  const containerRef = useRef(null);
  const { toast } = useToast();
  const { document, setDocument } = useActiveDocumentContext();

  useEffect(() => {
    // Get the document value from local storage
    const storedDoc = localStorage.getItem("document");

    // Check if a value was retrieved from local storage
    if (storedDoc) {
      // Parse the JSON string to convert it back to an object
      const newDoc = JSON.parse(storedDoc);

      // Set the parsed value to the context
      setDocument(newDoc);
    }
  }, [setDocument]);

  useEffect(() => {
    const container = containerRef.current;
    let PSPDFKit: any;
    (async function () {
      PSPDFKit = await import("pspdfkit");
      await PSPDFKit.load({
        container,
        document: document.file_url,
        // document: "/INV.pdf",
        baseUrl: `${window.location.protocol}//${window.location.host}/`,
      });
    })();

    return () => PSPDFKit && PSPDFKit.unload(container);
  }, []);

  // Define an interface for email pairs
  interface EmailPair {
    name: string;
    email_address: string;
  }

  interface FieldElements {
    title: string;
    subject: string;
    message: string;
  }

  const initialValues: EmailPair = {
    name: "",
    email_address: "",
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
    email_address: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    name: Yup.string().required("Name is required"),
  });

  const [emailPairs, setEmailPairs] = useState<EmailPair[]>([]);

  // handle email pair validation
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    form: any
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const { name, email_address } = form.values;
      if (validationSchema.isValidSync({ name, email_address })) {
        const newEmailPair: EmailPair = { name, email_address };
        setEmailPairs([...emailPairs, newEmailPair]);
        form.setFieldValue("name", "");
        form.setFieldValue("email_address", "");
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
    const { name, email_address } = values;

    const newEmailPair: EmailPair = { name, email_address };
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
        email_address: pair.email_address,
        name: pair.name,
        order: order++,
      };
      return signer;
    });

    console.log(signers);
  }, [emailPairs]);

  const handleSend = async (value: FieldElements) => {
    const { title, subject, message } = value;

    let headersList = {
      Accept: "*/*",
      // "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      Authorization: `Basic ${process.env.AUTHENTICATION}`,
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      title: title,
      subject: subject,
      message: message,
      signers: emailPairs,
      file_urls: [
        document.file_url,
      ],
      metadata: {
        custom_id: 1234,
        custom_text: document.name,
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
                    <Field
                      id="message"
                      name="message"
                      className="col-span-3 signatory-textarea w-full"
                    />
                  </div>
                  {/* Mail and name value pairs */}
                  <div>
                    <div>
                      {emailPairs.map((pair: EmailPair, index: number) => (
                        <Badge
                          variant="outline"
                          key={index}
                          className="email-pair"
                        >
                          {pair.name} - {pair.email_address}{" "}
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
                      initialValues={{ name: "", email_address: "" }}
                      validationSchema={signatorySchema}
                      onSubmit={(values, formikBag) => {
                        const { name, email_address } = values;
                        if (
                          signatorySchema.isValidSync({ name, email_address })
                        ) {
                          const newEmailPair: EmailPair = {
                            name,
                            email_address,
                          };
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
                            name="name"
                            className="signatory-fields"
                            id="name"
                            placeholder="Enter name"
                            onKeyDown={(e: any) =>
                              handleKeyDown(e, formikProps)
                            }
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="error"
                          />
                          <Field
                            type="text"
                            name="email_address"
                            className="signatory-fields"
                            id="email_address"
                            placeholder="Enter email"
                            onKeyDown={(e: any) =>
                              handleKeyDown(e, formikProps)
                            }
                          />
                          <ErrorMessage
                            name="email_address"
                            component="div"
                            className="error"
                          />
                          <Button
                            
                            variant={"ghost"}
                            onClick={(e) => {
                              e.preventDefault;
                              formikProps.submitForm();
                            }}
                          >
                            Add
                          </Button>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
                <Button type="submit" onClick={(e) => e.preventDefault}>
                  Send
                </Button>
              </Form>
            </Formik>
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
  );
}
