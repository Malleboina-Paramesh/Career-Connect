import React from "react";
import ProfileSection from "./_components/ProfileSection";

const Page = () => {
  return (
    <div className=" h-full  mx-auto  flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - User Info */}
        <ProfileSection />

        {/* Middle Column - Progress */}
        <div className="col-span-1 border shadow-md rounded-lg">
          <div className="  p-4 rounded-lg h-full">
            <h3 className="text-center mb-4">Progress</h3>
            <div className="w-56 h-56 bg-gray-200 rounded-full mx-auto"></div>
          </div>
        </div>

        {/* Right Column - Leet code Data */}
        <div className="col-span-1 border shadow-md rounded-lg">
          <div className="  p-4 rounded-lg h-full">
            <h3 className="text-center mb-4">Leetcode</h3>
            <div className="w-56 h-56 bg-gray-200 rounded-full mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Bottom Table */}
      <div className=" p-4 border shadow-md rounded-lg flex-1 min-h-[calc(100vh-495px)]">
        <table className="w-full h-full">
          <thead>
            <tr>
              <th className="text-left">Username</th>
              <th className="text-left">No of Q solved</th>
              <th className="text-left">Rank</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sample User</td>
              <td>100</td>
              <td>50</td>
            </tr>
            <tr>
              <td>Sample User</td>
              <td>100</td>
              <td>50</td>
            </tr>
            <tr>
              <td>Sample User</td>
              <td>100</td>
              <td>50</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
