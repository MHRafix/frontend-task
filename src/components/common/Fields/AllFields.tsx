import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { ErrorMessage, Field } from "formik";
import React from "react";

export const TextField: React.FC<{
  type: string;
  name: string;
  label: string;
}> = ({ type, name, label }) => {
  return (
    <>
      <Field
        type={type}
        name={name}
        id={name}
        style={{
          width: "100%",
          padding: "12px",
          border: "1px solid rgb(51 51 51 / 20%)",
          borderRadius: "2px",
          fontSize: "16px",
          outline: "none",
          margin: "5px 0px",
          fontFamily: "Poppins",
        }}
        placeholder={label}
      />

      <div
        style={{
          color: "red",
          textAlign: "left",
          fontFamily: "Poppins",
          fontSize: "24px",
        }}
      >
        <ErrorMessage name={name} />
      </div>
    </>
  );
};

export const TextAreaField: React.FC<{
  type: string;
  name: string;
  label: string;
}> = ({ type, name, label }) => {
  return (
    <>
      <Field
        as="textarea"
        type={type}
        name={name}
        id={name}
        style={{
          width: "100%",
          padding: "12px",
          border: "1px solid rgb(51 51 51 / 20%)",
          borderRadius: "2px",
          fontSize: "16px",
          outline: "none",
          margin: "5px 0px",
          fontFamily: "Poppins",
        }}
        placeholder={label}
      />
      <div style={{ color: "red", textAlign: "left", fontFamily: "Poppins" }}>
        <ErrorMessage name={name} />
      </div>
    </>
  );
};

export const LoginTextField: React.FC<{
  type: string;
  name: string;
  label: string;
}> = ({ type, name, label }) => {
  return (
    <>
      <Field
        type={type}
        name={name}
        id={name}
        style={{
          width: "96.5%",
          padding: "10px",
          border: "1px solid rgb(51 51 51 / 20%)",
          borderRadius: "2px",
          fontSize: "16px",
          outline: "none",
          margin: "5px 0px",
          fontFamily: "Poppins",
        }}
        placeholder={label}
      />
      <div style={{ color: "red", textAlign: "left", fontFamily: "Poppins" }}>
        <ErrorMessage name={name} />
      </div>
    </>
  );
};

export const SubmitButton: React.FC<{
  processing: boolean;
  children: string;
}> = ({ processing, children }) => {
  return (
    <>
      {!processing ? (
        <Button
          type="submit"
          variant="contained"
          color="success"
          sx={{
            width: "100%",
            margin: "5px 0px",
            fontFamily: "Poppins",
          }}
        >
          {children}
        </Button>
      ) : (
        <Button
          variant="contained"
          color="success"
          sx={{
            width: "100%",
            margin: "5px 0px",
            fontFamily: "Poppins",
          }}
        >
          <CircularProgress
            size={22}
            sx={{ margin: "5px 0px", color: "#b5b5b5" }}
          />
        </Button>
      )}
    </>
  );
};
