"use client"

// Contact.tsx
import { useState, ChangeEvent, FormEvent } from "react";
import { sendEmail } from "../api/contact/route";

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate form fields if necessary

    // Call sendEmail function
    const result = await sendEmail(formData);

    // Handle the result, e.g., show success or error message
    console.log(result);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Full Name:
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Message:
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <button type="submit">Submit</button>
    </form>
  );
};

export default Contact;
