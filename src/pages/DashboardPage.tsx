import BorrowerDetail from "@/components/borrower/BorrowerDetail";
import BorrowerPipeline from "@/components/borrower/BorrowerPipeline";
import BrokerOverview from "@/components/broker/BrokerOverview";
import Layout from "@/components/Layout";

function DashboardPage() {
  return (
    <Layout>
      <BorrowerPipeline />

      <BorrowerDetail />

      <BrokerOverview />
    </Layout>
  );
}

export default DashboardPage;
