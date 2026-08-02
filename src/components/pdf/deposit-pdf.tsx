import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import type { Deposit } from "../../utils/types";

interface dataSets {
  data: Deposit[];
}

interface JsPDFWithAutoTable extends jsPDF {
  lastAutoTable?: {
    finalY: number;
  };
}

const DepositPdf = ({ data }: dataSets) => {
  const year = new Date().getFullYear();

  const generateDepositReportPDF = () => {
    const doc = new jsPDF();

    const img = new Image();
    img.src = "/icon.png";

    img.onload = () => {
      // Logo
      doc.addImage(img, "PNG", 15, 10, 40, 40);

      // Texte après le logo
      doc.setFontSize(10);
      doc.text("ABICHOI SARL", 15, 55);
      doc.text("Direction de Finances", 15, 59);
      doc.text("NIF: A2317958W", 15, 63);
      doc.text("Numéro impôt: 19-F4300-N38512", 15, 67);
      doc.text("RCCM: CD/GOM/RCCM/23-B-00147", 15, 71);

      doc.setFontSize(10);
      doc.text("APPROVISIONNEMENT CAISSE", 105, 55, { align: "center" });
      doc.setFontSize(8);

      const head = [["Date", "Numéro", "Motif", "Source", "Montant", "Solde"]];

      // const body = data.map((item) => [
      //   new Date(item.created_at).toLocaleDateString(),
      //   item.deposit_number,
      //   item.description,
      //   item.source === "bank"
      //     ? "La banque"
      //     : item.source === "owner"
      //       ? "Argent personnel"
      //       : "Autre",
      //   item.amount + " " + (item.currency === "USD" ? "$" : "FC"),
      // ]);

      let usdBalance = 0;
      let cdfBalance = 0;

      const body = data.map((item) => {
        if (item.currency === "USD") {
          usdBalance += Number(item.amount);
        } else {
          cdfBalance += Number(item.amount);
        }

        return [
          new Date(item.created_at).toLocaleDateString(),
          item.deposit_number,
          item.description,
          item.source === "bank"
            ? "La banque"
            : item.source === "owner"
              ? "Argent personnel"
              : "Autre",
          `${Number(item.amount).toLocaleString()} ${item.currency === "USD" ? "$" : "FC"}`,
          item.currency === "USD"
            ? `${usdBalance.toLocaleString()} $`
            : `${cdfBalance.toLocaleString()} FC`,
        ];
      });

      // colors
      // const COLORS = {
      //   gold: [212, 175, 55], // Or
      //   dark: [40, 40, 40], // Noir
      //   light: [248, 248, 248], // Gris très clair
      //   border: [210, 210, 210], // Bordure
      //   text: [70, 70, 70], // Texte
      // };
      const COLORS = {
        gold: [212, 175, 55] as [number, number, number],
        dark: [40, 40, 40] as [number, number, number],
        light: [248, 248, 248] as [number, number, number],
        border: [210, 210, 210] as [number, number, number],
        text: [70, 70, 70] as [number, number, number],
      };

      autoTable(doc, {
        startY: 75,
        head,
        body,
        theme: "grid",
        styles: {
          fontSize: 8,
          cellPadding: 2,
          textColor: COLORS.text,
          lineColor: COLORS.border,
          lineWidth: 0.2,
          valign: "middle",
        },

        headStyles: {
          fillColor: COLORS.dark,
          textColor: [255, 255, 255],
          fontStyle: "bold",
          halign: "center",
          fontSize: 10,
        },

        bodyStyles: {
          fillColor: [255, 255, 255],
        },

        alternateRowStyles: {
          fillColor: COLORS.light,
        },

        columnStyles: {
          0: { halign: "center" },
          1: { halign: "left" },
          2: { halign: "center" },
          3: { halign: "right" },
          4: { halign: "center" },
        },
      });

      // autoTable(doc, {
      //   startY: 75,
      //   head: head,
      //   body: body,
      //   styles: { fontSize: 10 },
      //   headStyles: { fillColor: [220, 220, 220] },
      // });

      // const total = data.reduce((sum, d) => sum + Number(d.montant), 0);
      const lastAutoTable = (doc as JsPDFWithAutoTable).lastAutoTable;
      const finalY = (lastAutoTable?.finalY ?? 75) + 20;

      // new

      doc.setFont("helvetica", "bold");
      // doc.text("Résumé des totaux :", 60, finalY);

      autoTable(doc, {
        startY: finalY + 10,
        margin: { left: 60 },
        theme: "plain",
        styles: { fontSize: 10 },
        body: [],
        didParseCell: function (data) {
          const raw = data.row.raw;
          if (Array.isArray(raw) && String(raw[0]) === "Solde :") {
            data.cell.styles.fontSize = 11;
            data.cell.styles.fontStyle = "bold";
          }
        },
      });

      // === PIED DE PAGE ===
      const pageHeight = doc.internal.pageSize.height;
      doc.setFontSize(7);
      doc.setTextColor(120);
      doc.text(
        `© ${year} — Approvisionnement caisse | Abichoi System | Abichoi sarl`,
        65,
        pageHeight - 20,
      );

      doc.save(`Abichoi_approvisionnement.pdf`);
    };
    img.onerror = () => {
      console.error("Impossible de charger le logo.");
    };
  };

  return (
    <span
      className="bg-amber-500 rounded py-1 px-2 text-xs cursor-pointer"
      onClick={generateDepositReportPDF}
    >
      PDF
    </span>
  );
};

export default DepositPdf;

// const AhadiPaidReport = ({ data }: dataSets) => {
//   const church = localStorage.getItem("eglise");

//   // console.log("DATA : ", data);

//   // const dataWithSolde = data.reduce(
//   //   (acc, d, index) => {
//   //     const previousSolde = index === 0 ? 0 : acc[index - 1].solde;

//   //     const montantIn = d.type_payement === "in" ? d.montant : 0;
//   //     const montantOut = d.type_payement === "out" ? d.montant : 0;

//   //     acc.push({
//   //       ...d,
//   //       solde: previousSolde + montantIn - montantOut,
//   //     });

//   //     return acc;
//   //   },
//   //   [] as Array<(typeof data)[0] & { solde: number }>,
//   // );

//   return (
//     <div className="download">
//       {}
//       <button
//         onClick={generateAhadiPaidReportPDF}
//         className="btn"
//         title="Exporter en PDF"
//       >
//         <DownloadCloud />
//       </button>
//     </div>
//   );
// };

// export default AhadiPaidReport;
