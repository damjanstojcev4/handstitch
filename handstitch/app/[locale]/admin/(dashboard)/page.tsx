export default function AdminDashboard() {
    return (
        <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 rounded-2xl border border-black/5 bg-black/[0.02] p-8">
                <p className="text-[10px] uppercase tracking-[0.34em] text-black/45">Overview</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-black/85">Admin Console</h2>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="rounded-xl border border-black/5 bg-black/[0.02] p-4">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-black/30">System Status</p>
                        <p className="mt-1 text-sm text-green-600">Connected</p>
                    </div>
                    <div className="rounded-xl border border-black/5 bg-black/[0.02] p-4">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-black/30">Auth Module</p>
                        <p className="mt-1 text-sm text-black/70">Verified</p>
                    </div>
                </div>
                <p className="mt-8 text-sm text-black/45 italic">
                    Ready for data integration: models, materials, orders.
                </p>
            </div>
        </div>
    );
}
