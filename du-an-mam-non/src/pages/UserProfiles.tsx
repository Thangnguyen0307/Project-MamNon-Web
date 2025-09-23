import UserInfoCard from "../components/UserProfile/UserInfoCard";
import PageMeta from "../components/common/PageMeta";

export default function UserProfiles() {
  return (
    <>
      <PageMeta
        title="React.js Profile Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />

      <div className=" lg:p-6">
        <div className="space-y-6 max-w-3xl mx-auto ">
          <UserInfoCard />
        </div>
      </div>
    </>
  );
}
