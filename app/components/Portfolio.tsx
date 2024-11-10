import { useEffect, useState } from "react";
import axios from "axios";

// Define the types for the props


const Dashboard: React.FC<DashboardProps> = ({ bearerToken }) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Function to fetch portfolio activity
    const fetchPortfolioActivity = async () => {
      try {
        const response = await axios.get<PortfolioResponse>(
          "https://sandbox-api.okto.tech/api/v1/portfolio/activity",
          {
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json',
              },
          });

        if (response.data.status === "success") {
          setActivities(response.data.data.activity);
        } else {
          setError("Failed to fetch data.");
        }
      } catch (err) {
        console.log(err)
        setError("Error fetching portfolio activity.",);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioActivity();
  }, [bearerToken]); // Re-fetch data when the bearerToken changes

  return (
    <div className="p-6">
      <h2 className="text-3xl mb-6">Portfolio Activity</h2>

      {/* Loading State */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display Activity Data */}
      <div className="space-y-4">
        {activities.length === 0 ? (
          <p>No activity found.</p>
        ) : (
          activities.map((activity, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
            >
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <span className="text-lg font-bold">{activity.description}</span>
                  <span className="text-sm text-gray-500">
                    {activity.order_type} - {activity.order_state}
                  </span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-xl font-semibold">{activity.token_name}</span>
                  <span className="text-sm text-gray-500">{activity.network_name}</span>
                </div>
              </div>
              <div className="mt-2 flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">Quantity: {activity.quantity}</p>
                  <p className="text-sm text-gray-500">
                    Transaction Hash:{" "}
                    <a
                      href={`https://explorer.matic.network/tx/${activity.tx_hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600"
                    >
                      {activity.tx_hash.slice(0, 8)}...{/* Showing shortened hash */}
                    </a>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    Timestamp: {new Date(parseInt(activity.timestamp) * 1000).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
