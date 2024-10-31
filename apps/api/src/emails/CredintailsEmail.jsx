import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
  Button,
  Hr,
} from "@react-email/components";
import React from "react";

// Helper function to format role and subRole
const formatRole = (role) => {
  return role
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase());
};

const getRoleDescription = (role, subRole) => {
  switch (role) {
    case "ADMIN":
      switch (subRole) {
        case "MASTER_ADMIN":
          return "Full platform access and management capabilities";
        case "MENTOR_ADMIN":
          return "Manage and oversee mentor-related operations";
        case "STUDENT_ADMIN":
          return "Handle student administration and management";
        case "COURSE_ADMIN":
          return "Create and manage course content";
        default:
          return "";
      }
    case "MENTOR":
      switch (subRole) {
        case "TRAINER_MENTOR":
          return "Conduct training sessions and workshops";
        case "ADVISOR_MENTOR":
          return "Provide guidance and career advice";
        case "COMPANY_MENTOR":
          return "Industry expertise and company connections";
        default:
          return "";
      }
    case "STUDENT":
      return "Access to learning resources and courses";
    default:
      return "";
  }
};

export default function CredentialsEmail({
  email,
  password,
  loginLink,
  role,
  subRole,
  appName,
}) {
  const roleDescriptionText = getRoleDescription(role, subRole);

  return (
    <Html>
      <Head />
      <Preview>Welcome to {appName} - Your Account Credentials</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logo}>{appName}</Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Text style={greeting}>Welcome to Your New Role! 🎉</Text>

            <Text style={paragraph}>
              Your account has been created with the following role:
            </Text>

            {/* Role Information */}
            <Section style={roleBox}>
              <Text style={roleTitle}>
                {formatRole(role)}
                {subRole && ` - ${formatRole(subRole)}`}
              </Text>
              {roleDescriptionText && (
                <Text style={roleDescription}>{roleDescriptionText}</Text>
              )}
            </Section>

            {/* Credentials */}
            <Text style={paragraph}>Here are your login credentials:</Text>

            <Section style={credentialsBox}>
              <Text style={credentialItem}>
                <strong>Email:</strong> {email}
              </Text>
              <Text style={credentialItem}>
                <strong>Password:</strong> {password}
              </Text>
            </Section>

            <Text style={securityNote}>
              🔐 For security reasons, please change your password after your
              first login.
            </Text>

            <Button href={loginLink} style={button}>
              Login Now
            </Button>

            <Hr style={divider} />

            <Text style={helpText}>
              Need assistance? Our support team is here to help! Contact us at
              support@{appName}.com
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              © 2024 {appName}. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0",
  width: "580px",
};

const header = {
  backgroundColor: "#2563eb",
  padding: "20px",
  borderRadius: "8px 8px 0 0",
};

const logo = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center",
  margin: "0",
};

const content = {
  backgroundColor: "#ffffff",
  padding: "40px",
  borderRadius: "0 0 8px 8px",
};

const greeting = {
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0 0 20px",
  color: "#1a2b4b",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "24px",
  margin: "16px 0",
  color: "#334155",
};

const roleBox = {
  backgroundColor: "#eef2ff",
  padding: "20px",
  borderRadius: "8px",
  margin: "20px 0",
  borderLeft: "4px solid #2563eb",
};

const roleTitle = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#1e40af",
  margin: "0 0 8px 0",
};

const roleDescription = {
  fontSize: "14px",
  color: "#4b5563",
  margin: "0",
  lineHeight: "1.5",
};

const credentialsBox = {
  backgroundColor: "#f8fafc",
  padding: "20px",
  borderRadius: "8px",
  margin: "20px 0",
  border: "1px solid #e2e8f0",
};

const credentialItem = {
  margin: "8px 0",
  fontSize: "16px",
  color: "#334155",
};

const securityNote = {
  fontSize: "14px",
  color: "#dc2626",
  margin: "16px 0",
  fontWeight: "500",
};

const button = {
  backgroundColor: "#2563eb",
  borderRadius: "6px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center",
  display: "block",
  width: "100%",
  padding: "12px",
  margin: "24px 0",
};

const divider = {
  borderTop: "1px solid #e2e8f0",
  margin: "32px 0",
};

const helpText = {
  fontSize: "14px",
  color: "#64748b",
  textAlign: "center",
  lineHeight: "1.5",
};

const footer = {
  textAlign: "center",
  padding: "20px",
};

const footerText = {
  fontSize: "12px",
  color: "#64748b",
};
