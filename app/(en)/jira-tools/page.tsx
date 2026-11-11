import JiraToolsLanding from "../../../components/jira-tools/JiraToolsLanding";
import { jiraToolsMetadata } from "../../../components/jira-tools/metadata";

export const metadata = jiraToolsMetadata("en");

export default function JiraToolsPage() {
  return <JiraToolsLanding locale="en" />;
}
