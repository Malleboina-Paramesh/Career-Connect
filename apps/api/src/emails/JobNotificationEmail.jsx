import { Html } from "@react-email/html";
import { Text } from "@react-email/text";

const JobNotificationEmailTemplate = ({ jobTitle, companyName, applyLink }) => (
  <Html>
    <Text>Hello,</Text>
    <Text>
      We are excited to inform you about a new job opening for {jobTitle} at{" "}
      {companyName}.
    </Text>
    <Text>
      <a href={applyLink}>Click here to view the job details and apply.</a>
    </Text>
    <Text>Best of luck!</Text>
    <Text>The Careers Team</Text>
  </Html>
);

export default JobNotificationEmailTemplate;
