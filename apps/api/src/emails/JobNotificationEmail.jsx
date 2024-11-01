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

export default function JobNotificationEmail({
  jobTitle,
  companyName,
  applyLink,
  appName,
}) {
  return (
    <Html>
      <Head />
      <Preview>{`New Job Opportunity - ${appName}`}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logo}>{appName}</Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Text style={greeting}>New Job Opportunity</Text>

            <Text style={paragraph}>
              We're excited to inform you about a new position that matches your
              interests:
            </Text>

            {/* Job Information */}
            <Section style={jobInfoBox}>
              <Text style={jobDetail}>
                <strong>Position:</strong> {jobTitle}
              </Text>
              <Text style={jobDetail}>
                <strong>Company:</strong> {companyName}
              </Text>
            </Section>

            <Text style={paragraph}>
              Don't miss out on this exciting opportunity! Click the button
              below to apply now.
            </Text>

            <Button href={applyLink} style={button}>
              Apply Now
            </Button>

            <Hr style={divider} />

            <Text style={helpText}>
              You're receiving this email because you've subscribed to job
              notifications from {companyName}. If you have questions or need
              assistance, please contact our support team at support@
              {appName.toLowerCase()}.com
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              © {new Date().getFullYear()} {appName}. All rights reserved.
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
  backgroundColor: "#2563eb", // Changed to match login notification color
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

const jobInfoBox = {
  backgroundColor: "#f8fafc",
  padding: "20px",
  borderRadius: "8px",
  margin: "20px 0",
  border: "1px solid #e2e8f0",
};

const jobDetail = {
  margin: "8px 0",
  fontSize: "16px",
  color: "#334155",
};

const button = {
  backgroundColor: "#2563eb", // Changed to match login notification color
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
