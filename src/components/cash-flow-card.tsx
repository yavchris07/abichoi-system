/* =========================================================
   CASH FLOW
========================================================= */

export const CashFlowCard = () => {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-sm font-semibold text-zinc-950">
            Flux de trésorerie
          </h2>

          <p className="mt-0.5 text-[11px] text-zinc-400">
            Évolution des entrées et sorties.
          </p>
        </div>

        <select className="rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-[10px] text-zinc-600 outline-none focus:border-amber-500">
          <option>7 jours</option>
          <option>30 jours</option>
          <option>3 mois</option>
        </select>
      </div>

      {/* Chart placeholder */}
      <div className="mt-6 h-60">
        <div className="relative h-full">
          {/* Grid */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="border-t border-dashed border-zinc-100"
              />
            ))}
          </div>

          {/* Fake chart */}
          <div className="absolute inset-x-0 bottom-5 top-5 flex items-end justify-around px-3">
            {[
              { in: 48, out: 25 },
              { in: 65, out: 32 },
              { in: 42, out: 28 },
              { in: 80, out: 35 },
              { in: 60, out: 42 },
              { in: 90, out: 38 },
              { in: 72, out: 30 },
            ].map((item, index) => (
              <div key={index} className="flex h-full items-end gap-1">
                <div
                  className="w-3 rounded-t-md bg-amber-400/80 transition hover:bg-amber-500"
                  style={{
                    height: `${item.in}%`,
                  }}
                />

                <div
                  className="w-3 rounded-t-md bg-zinc-200 transition hover:bg-zinc-300"
                  style={{
                    height: `${item.out}%`,
                  }}
                />
              </div>
            ))}
          </div>

          {/* Labels */}
          <div className="absolute inset-x-0 bottom-0 flex justify-around text-[9px] text-zinc-400">
            <span>Lun</span>
            <span>Mar</span>
            <span>Mer</span>
            <span>Jeu</span>
            <span>Ven</span>
            <span>Sam</span>
            <span>Dim</span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-5 border-t border-zinc-100 pt-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-amber-400" />

          <span className="text-[10px] text-zinc-500">Entrées</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-zinc-300" />

          <span className="text-[10px] text-zinc-500">Sorties</span>
        </div>
      </div>
    </div>
  );
};