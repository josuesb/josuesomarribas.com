import JiraToolsLanding from "../../../../components/jira-tools/JiraToolsLanding";
import { jiraToolsMetadata } from "../../../../components/jira-tools/metadata";

export const metadata = jiraToolsMetadata("es");

export default function JiraToolsPage() {
  return <JiraToolsLanding locale="es" />;
}
