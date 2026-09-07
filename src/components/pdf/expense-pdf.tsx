import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import type { Expense } from "../../utils/types";

interface dataSets {
  data: Expense[];
}

interface JsPDFWithAutoTable extends jsPDF {
  lastAutoTable?: {
    finalY: number;
  };
}

const ExpensePdf = ({ data }: dataSets) => {
  const generateReportPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const img = new Image();
    img.src = "/icon.png";

    img.onload = () => {
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      /* ============================================================
         COLORS
      ============================================================ */

      const COLORS = {
        amber: [212, 175, 55] as [number, number, number],
        dark: [39, 39, 42] as [number, number, number],
        text: [63, 63, 70] as [number, number, number],
        muted: [113, 113, 122] as [number, number, number],
        light: [250, 250, 250] as [number, number, number],
        border: [225, 225, 228] as [number, number, number],
        green: [22, 101, 52] as [number, number, number],
        greenBg: [240, 253, 244] as [number, number, number],
        red: [185, 28, 28] as [number, number, number],
        redBg: [254, 242, 242] as [number, number, number],
      };

      /* ============================================================
         HELPERS
      ============================================================ */

      const formatMoney = (value: number, currency: string) => {
        return `${value.toLocaleString("en-EN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} ${currency === "USD" ? "$" : "FC"}`;
      };

      const formatDate = (date?: string) => {
        if (!date) return "-";

        return new Date(date).toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
      };

      /* ============================================================
         LOGO CENTRÉ
      ============================================================ */

      const logoWidth = 28;
      const logoHeight = 28;

      const logoX = (pageWidth - logoWidth) / 2;
      const logoY = 8;

      doc.addImage(img, "PNG", logoX, logoY, logoWidth, logoHeight);

      /* ============================================================
         ENTREPRISE
      ============================================================ */

      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(...COLORS.dark);

      doc.text("ABICHOI SARL", pageWidth / 2, 42, { align: "center" });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(...COLORS.muted);

      doc.text("Direction des Finances", pageWidth / 2, 47, {
        align: "center",
      });

      doc.text(
        "NIF : A2317958W   •   RCCM : CD/GOM/RCCM/23-B-00147",
        pageWidth / 2,
        52,
        { align: "center" },
      );

      doc.text("Numéro impôt : 19-F4300-N38512", pageWidth / 2, 57, {
        align: "center",
      });

      /* ============================================================
         TITRE
      ============================================================ */

      doc.setFillColor(...COLORS.dark);

      doc.roundedRect(pageWidth / 2 - 45, 62, 90, 10, 2, 2, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(255, 255, 255);

      doc.text("DEPENSES", pageWidth / 2, 68.5, { align: "center" });

      /* ============================================================
         PÉRIODE
      ============================================================ */

      const year = new Date().getFullYear();

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(...COLORS.muted);

      doc.text(`Rapport financier — Exercice ${year}`, pageWidth / 2, 77, {
        align: "center",
      });

      /* ============================================================
         BALANCES
      ============================================================ */

      /*
       * Important :
       * On suppose que data est déjà trié du plus ancien
       * au plus récent.
       */

      let usdBalance = 0;
      let cdfBalance = 0;

      const body = data.map((item) => {
        const amount = Number(item.amount) || 0;

        const isUSD = item.currency === "USD";

        if (isUSD) {
          usdBalance += Number(item.amount);
        } else {
          cdfBalance += Number(item.amount);
        }

        const balance = isUSD ? usdBalance : cdfBalance;

        return [
          formatDate(item.created_at),

          item.expense_number || "-",

          item.description || "-",

          item.beneficiary || "-",
          item.payment_method || "-",

          formatMoney(amount, item.currency),
          formatMoney(balance, item.currency),
        ];
      });

      /* ============================================================
         TABLE
      ============================================================ */
       autoTable(doc, {
        startY: 84,

        head: [
          [
            "Date",
            "Numéro",
            "Motif",
            "Bénéficiaire",
            "Méthode de paiement",
            "Montant",
            "Solde",
          ],
        ],

        body,

        theme: "grid",

        margin: {
          left: 10,
          right: 10,
          bottom: 25,
        },

        styles: {
          font: "helvetica",
          fontSize: 7.5,
          cellPadding: 3,
          textColor: COLORS.text,
          lineColor: COLORS.border,
          lineWidth: 0.2,
          valign: "middle",
        },

        headStyles: {
          fillColor: COLORS.dark,
          textColor: [255, 255, 255],
          fontStyle: "bold",
          fontSize: 8,
          halign: "center",
          valign: "middle",
          cellPadding: 3.5,
        },

        bodyStyles: {
          fillColor: [255, 255, 255],
        },

        alternateRowStyles: {
          fillColor: COLORS.light,
        },

        columnStyles: {
          0: {
            halign: "center",
            cellWidth: 22,
          },

          1: {
            halign: "center",
            cellWidth: 27,
          },

          2: {
            halign: "left",
            cellWidth: 34,
          },

          3: {
            halign: "left",
            cellWidth: 32,
          },

          4: {
            halign: "center",
            cellWidth: 30,
          },

          5: {
            halign: "left",
            cellWidth: 33,
          },
        },

        didParseCell: (hookData) => {
          /*
           * Colorisation de la colonne Type.
           */
          if (hookData.section === "body" && hookData.column.index === 4) {
            const value = String(hookData.cell.raw);

            if (value === "Entrée") {
              hookData.cell.styles.textColor = COLORS.green;

              hookData.cell.styles.fontStyle = "bold";
            }

            if (value === "Sortie") {
              hookData.cell.styles.textColor = COLORS.red;

              hookData.cell.styles.fontStyle = "bold";
            }
          }

          /*
           * Montants.
           */
          if (hookData.section === "body" && hookData.column.index === 5) {
            const row = hookData.row.raw as string[];

            if (row[4] === "Entrée") {
              hookData.cell.styles.textColor = COLORS.green;
            } else {
              hookData.cell.styles.textColor = COLORS.red;
            }

            hookData.cell.styles.fontStyle = "bold";
          }

          /*
           * Solde.
           */
          if (hookData.section === "body" && hookData.column.index === 6) {
            hookData.cell.styles.fontStyle = "bold";
          }
        },

        didDrawPage: () => {
          /* ========================================================
                   FOOTER
                ======================================================== */

          const footerY = pageHeight - 14;

          doc.setDrawColor(...COLORS.border);
          doc.setLineWidth(0.3);

          doc.line(10, footerY - 5, pageWidth - 10, footerY - 5);

          doc.setFont("helvetica", "normal");
          doc.setFontSize(7);
          doc.setTextColor(...COLORS.muted);

          /*
           * Adresse
           */
          doc.text(
            "007, Rue NZUMUKA, Av. Touriste, Q. Les Volcans, Goma, RDC",
            pageWidth / 2,
            footerY,
            {
              align: "center",
            },
          );

          /*
           * Système + page
           */
          doc.setFontSize(6.5);

          doc.text(
            `© ${new Date().getFullYear()} — ABICHOI SYSTEM | ABICHOI SARL`,
            10,
            pageHeight - 6,
          );

          doc.text(
            `Page ${doc.getNumberOfPages()}`,
            pageWidth - 10,
            pageHeight - 6,
            {
              align: "right",
            },
          );
        },
      });

      /* ============================================================
         RÉSUMÉ
      ============================================================ */

      const lastAutoTable = (doc as JsPDFWithAutoTable).lastAutoTable;

      const finalY = (lastAutoTable?.finalY ?? 84) + 10;

      /*
       * Si suffisamment d'espace reste sur la page,
       * afficher le résumé.
       */
      if (finalY < pageHeight - 45) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(...COLORS.dark);

        doc.text("Résumé du journal", 10, finalY);

        /*
         * Solde final USD / CDF
         */
        // const summaryY = finalY + 7;

        // doc.setFillColor(...COLORS.light);
        // doc.setDrawColor(...COLORS.border);

        // doc.roundedRect(10, summaryY, 80, 15, 2, 2, "FD");

        // doc.roundedRect(95, summaryY, 80, 15, 2, 2, "FD");

        // doc.setFont("helvetica", "normal");
        // doc.setFontSize(7);
        // doc.setTextColor(...COLORS.muted);

        // doc.text("Solde final USD", 15, summaryY + 6);

        // doc.text("Solde final CDF", 100, summaryY + 6);

        // doc.setFont("helvetica", "bold");
        // doc.setFontSize(9);
        // doc.setTextColor(...COLORS.dark);

        // doc.text(formatMoney(usdBalance, "USD"), 15, summaryY + 11);

        // doc.text(formatMoney(cdfBalance, "CDF"), 100, summaryY + 11);
      }

      /* ============================================================
         SIGNATURE
      ============================================================ */

      const signatureY = pageHeight - 35;

      if (signatureY > finalY + 25) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(...COLORS.text);

        doc.text("Responsable des Finances", pageWidth - 65, signatureY, {
          align: "center",
        });

        doc.setDrawColor(...COLORS.border);

        doc.line(
          pageWidth - 95,
          signatureY + 18,
          pageWidth - 35,
          signatureY + 18,
        );
      }

      /* ============================================================
         SAVE
      ============================================================ */

      doc.save(`Abichoi_journal_caisse_${year}.pdf`);
    };

    img.onerror = () => {
      console.error("Impossible de charger le logo.");
    };
  };
  return (
    <span
      className="
        inline-flex
        items-center
        justify-center
        rounded-lg
        bg-amber-500
        px-3
        py-1.5
        text-xs
        font-semibold
        text-zinc-950
        transition
        hover:bg-amber-400
        active:scale-95
        cursor-pointer"
      onClick={generateReportPDF}
    >
      PDF
    </span>
  );
};

export default ExpensePdf;
