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

export default function LoginNotificationEmail({
  email,
  loginTime,
  device,
  appName,
}) {
  return (
    <Html>
      <Head />
      <Preview>{`Login Notification - ${appName}`}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logo}>{appName}</Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Text style={greeting}>Login Notification</Text>

            <Text style={paragraph}>
              We detected a new login to your account with the following
              details:
            </Text>

            {/* Login Information */}
            <Section style={loginInfoBox}>
              <Text style={loginDetail}>
                <strong>Login Time:</strong> {loginTime}
              </Text>
              <Text style={loginDetail}>
                <strong>Device:</strong> {device.deviceType || "Unknown"}
              </Text>
              <Text style={loginDetail}>
                <strong>Browser:</strong> {device.browser || "Unknown"}
              </Text>
              <Text style={loginDetail}>
                <strong>Operating System:</strong> {device.os || "Unknown"}
              </Text>
            </Section>

            <Text style={securityNote}>
              If this login was not initiated by you, please secure your account
              by resetting your password.
            </Text>

            <Button
              href={`${process.env.APP_URL}/account-security`}
              style={button}
            >
              Secure My Account
            </Button>

            <Hr style={divider} />

            <Text style={helpText}>
              If you have questions or need assistance, please contact our
              support team at support@{appName}.com.
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

const loginInfoBox = {
  backgroundColor: "#f8fafc",
  padding: "20px",
  borderRadius: "8px",
  margin: "20px 0",
  border: "1px solid #e2e8f0",
};

const loginDetail = {
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
