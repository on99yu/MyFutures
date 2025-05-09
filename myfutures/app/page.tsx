export default function Home() {
  const symbols = ['NAS100+', 'XAUUSD+', 'USOUSD+', 'EURUSD+'];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Futures Data</h2>
      <div className="bg-white shadow-md border-1 border-gray-500 rounded-xl overflow-hidden">
        <table className="min-w-full divide-y divide-gray-500">
          <thead className="bg-gray-50">
            <tr className="divide-x divide-gray-500">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Symbol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ATR (1H)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {symbols.map((symbol) => (
              <tr key={symbol}>
                <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  {symbol}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Loading...
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Loading...
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-gray-600">
        <p>Data will be fetched from API in the next step.</p>
      </div>
    </div>
  );
}