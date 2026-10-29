"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Send } from "lucide-react";

const applicationSchema = Yup.object({
  name: Yup.string().trim().min(2, "Please enter your full name").required("Your name is required"),
  email: Yup.string().email("Enter a valid email address").required("Your email is required"),
  phone: Yup.string()
    .trim()
    .matches(/^(?:\+233[\s-]?\d{9}|\d{10})$/, "Use +233 followed by 9 digits or a 10-digit number")
    .required("Your phone number is required"),
  universityProgram: Yup.string().trim().min(2, "Please enter your university program").required("Your university program is required"),
  track: Yup.string().oneOf(["website-development"], "Please select a track").required("Please select a track"),
  experience: Yup.string().required("Please select your experience level"),
  motivation: Yup.string().trim().min(20, "Tell us a little more (at least 20 characters)").required("This field is required"),
});

type ApplicationValues = {
  name: string;
  email: string;
  phone: string;
  universityProgram: string;
  track: string;
  experience: string;
  motivation: string;
};

const initialValues: ApplicationValues = {
  name: "",
  email: "",
  phone: "",
  universityProgram: "",
  track: "",
  experience: "",
  motivation: "",
};

export default function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="success-card">
        <div className="success-icon">✓</div>
        <p className="eyebrow">APPLICATION RECEIVED</p>
        <h3>You&apos;re on our list.</h3>
        <p>Thanks for sharing your story. Our team will be in touch soon with next steps.</p>
        <button className="text-button" onClick={() => setSubmitted(false)}>Send another application <span>↗</span></button>
      </div>
    );
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={applicationSchema}
      onSubmit={async (values, { setSubmitting, setStatus }) => {
        setStatus(undefined);
        try {
          const response = await fetch("/api/applications", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          });
          const result = await response.json();
          if (!response.ok) throw new Error(result.error || "Something went wrong.");
          setSubmitted(true);
        } catch (error) {
          setStatus(error instanceof Error ? error.message : "Unable to submit your application.");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, status }) => (
        <Form className="application-form" noValidate>
          <div className="form-row">
            <label>FULL NAME <Field name="name" placeholder="Your name" /> <ErrorMessage name="name" component="span" /></label>
            <label>EMAIL ADDRESS <Field name="email" type="email" placeholder="you@example.com" /> <ErrorMessage name="email" component="span" /></label>
          </div>
          <div className="form-row">
            <label>PHONE NUMBER <Field name="phone" type="tel" inputMode="tel" placeholder="0200000000" /> <ErrorMessage name="phone" component="span" /></label>
            <label>TRACK
              <Field as="select" name="track">
                <option value="">Select a track</option>
                <option value="website-development">Website Development</option>
              </Field>
              <ErrorMessage name="track" component="span" />
            </label>
          </div>
          <label>UNIVERSITY PROGRAM <Field name="universityProgram" placeholder="e.g. Bsc Computer Science , Information Technology" /> <ErrorMessage name="universityProgram" component="span" /></label>
          <div className="form-row ">
            <label className="full-width-field">EXPERIENCE LEVEL
              <Field as="select" name="experience">
                <option value="">Select one</option>
                <option value="beginner">Just getting started with coding</option>
                <option value="some"> I have some coding experience</option>

              </Field>
              <ErrorMessage name="experience" component="span" />
            </label>
          </div>
          <label>WHY DO YOU WANT TO ENROLL INTO THIS PROGRAM? <Field as="textarea" name="motivation" rows={4} placeholder="Tell us why you want to enroll..." /> <ErrorMessage name="motivation" component="span" /></label>
          {status && <p className="form-status" role="alert">{status}</p>}
          <button className="button button-accent submit-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending application..." : "Submit application"}  <Send />
          </button>
          <p className="privacy-note">By applying, you agree to hear from TEQVAULT about this program.</p>
        </Form>
      )}
    </Formik>
  );
}
