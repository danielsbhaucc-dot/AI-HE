export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-mesh-subtle">
      <div className="container-mobile py-6 pb-8 space-y-5">

        {/* Header skeleton */}
        <div className="flex items-center gap-3 mb-7">
          <div className="w-10 h-10 rounded-2xl animate-pulse" style={{ background: 'rgba(20,184,166,0.12)', border: '1px solid rgba(20,184,166,0.15)' }} />
          <div className="space-y-1.5">
            <div className="h-6 w-36 rounded-xl animate-pulse" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <div className="h-3.5 w-52 rounded-lg animate-pulse" style={{ background: 'rgba(255,255,255,0.05)' }} />
          </div>
        </div>

        {/* Stats row skeleton */}
        <div className="grid grid-cols-3 gap-2.5 mb-8">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-2xl p-3 text-center animate-pulse"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', animationDelay: `${i * 80}ms` }}>
              <div className="w-8 h-8 rounded-xl mx-auto mb-2" style={{ background: 'rgba(255,255,255,0.07)' }} />
              <div className="h-5 w-8 mx-auto rounded-lg mb-1" style={{ background: 'rgba(255,255,255,0.07)' }} />
              <div className="h-2.5 w-14 mx-auto rounded-md" style={{ background: 'rgba(255,255,255,0.04)' }} />
            </div>
          ))}
        </div>

        {/* Section title skeleton */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-1.5 h-7 rounded-full" style={{ background: 'rgba(20,184,166,0.2)' }} />
          <div className="h-5 w-24 rounded-xl animate-pulse" style={{ background: 'rgba(255,255,255,0.08)' }} />
        </div>

        {/* Card skeletons */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-3xl overflow-hidden animate-pulse"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              animationDelay: `${i * 100}ms`,
            }}
          >
            <div className="w-full" style={{ aspectRatio: '16/9', background: 'rgba(255,255,255,0.05)' }} />
            <div className="p-4 space-y-2.5">
              <div className="h-4 w-3/4 rounded-lg" style={{ background: 'rgba(255,255,255,0.07)' }} />
              <div className="h-3 w-full rounded-md" style={{ background: 'rgba(255,255,255,0.04)' }} />
              <div className="h-3 w-2/3 rounded-md" style={{ background: 'rgba(255,255,255,0.04)' }} />
              <div className="h-2 w-full rounded-full mt-3" style={{ background: 'rgba(255,255,255,0.06)' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
