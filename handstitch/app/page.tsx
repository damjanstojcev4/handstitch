import WalletConfigurator from "./components/WalletConfigurator";

export default function Home() {
  return (
    <main className="p-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Custom Wallet Builder
      </h1>

      <WalletConfigurator />
    </main>
  );
}
