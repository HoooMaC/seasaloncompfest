import { CardHeader, CardTitle } from '@/components/ui/card';
import TransactionHistorySection from '@/components/User/TransactionHistorySection';

const TransactionHistoryPage = () => {
  return (
    <>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
      </CardHeader>
      <TransactionHistorySection />
    </>
  );
};
export default TransactionHistoryPage;
