interface ShimmerProp {
  className: string;
}

// Loading animation
const Shimmer = ({ className }: ShimmerProp) => (
  <div
    className={`relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent ${className}`}
  ></div>
);

export function CardSkeleton() {
  return (
    <div
      className={`flex w-full max-w-[330px] flex-col gap-4 rounded-[12px] border border-slate-200 p-[12px] shadow-sm`}
    >
      <Shimmer className="h-[200px] w-full rounded-[6px] bg-gray-200" />
      <Shimmer className="mt-2 h-6 w-24 rounded-md bg-gray-200" />
      <Shimmer className="h-6 w-full rounded-md bg-gray-200" />
      <div className="flex items-center gap-3">
        <Shimmer className="h-8 w-8 rounded-full bg-gray-200" />
        <Shimmer className="h-6 w-20 rounded-md bg-gray-200" />
        <Shimmer className="h-6 w-16 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </>
  );
}

// export function HeaderSkeleton() {
//   return (
//     <div className="relative w-full overflow-hidden md:col-span-4`}>
//       <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
//       <div className="rounded-xl bg-gray-100 p-4">
//         <div className="sm:grid-cols-13 mt-0 grid h-[410px] grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4" />
//         <div className="flex items-center pb-2 pt-6">
//           <div className="h-5 w-5 rounded-full bg-gray-200" />
//           <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
//         </div>
//       </div>
//     </div>
//   );
// }

export function NavbarSkeleton() {
  return (
    <div className="flex flex-row items-center justify-between border-b border-gray-100 py-4">
      <div className="flex items-center">
        <div className="mr-2 h-8 w-8 rounded-full bg-gray-200" />
        <div className="min-w-0">
          <div className="h-5 w-40 rounded-md bg-gray-200" />
          <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
        </div>
      </div>
      <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
    </div>
  );
}

// export function FooterSkeleton() {
//   return (
//     <div
//       className="relative flex w-full flex-col overflow-hidden md:col-span-4`}
//     >
//       <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
//       <div className="flex grow flex-col justify-between rounded-xl bg-gray-100 p-4">
//         <div className="bg-white px-6">
//           <InvoiceSkeleton />
//           <InvoiceSkeleton />
//           <InvoiceSkeleton />
//           <InvoiceSkeleton />
//           <InvoiceSkeleton />
//           <div className="flex items-center pb-2 pt-6">
//             <div className="h-5 w-5 rounded-full bg-gray-200" />
//             <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function ContentSkeleton() {
//   return (
//     <>
//       <div
//         className="relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-100`}
//       />
//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//         <CardSkeleton />
//         <CardSkeleton />
//         <CardSkeleton />
//         <CardSkeleton />
//       </div>
//       <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
//         <RevenueChartSkeleton />
//         <LatestInvoicesSkeleton />
//       </div>
//     </>
//   );
// }

// export function TableRowSkeleton() {
//   return (
//     <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
//       {/* Customer Name and Image */}
//       <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
//         <div className="flex items-center gap-3">
//           <div className="h-8 w-8 rounded-full bg-gray-100"></div>
//           <div className="h-6 w-24 rounded bg-gray-100"></div>
//         </div>
//       </td>
//       {/* Email */}
//       <td className="whitespace-nowrap px-3 py-3">
//         <div className="h-6 w-32 rounded bg-gray-100"></div>
//       </td>
//       {/* Amount */}
//       <td className="whitespace-nowrap px-3 py-3">
//         <div className="h-6 w-16 rounded bg-gray-100"></div>
//       </td>
//       {/* Date */}
//       <td className="whitespace-nowrap px-3 py-3">
//         <div className="h-6 w-16 rounded bg-gray-100"></div>
//       </td>
//       {/* Status */}
//       <td className="whitespace-nowrap px-3 py-3">
//         <div className="h-6 w-16 rounded bg-gray-100"></div>
//       </td>
//       {/* Actions */}
//       <td className="whitespace-nowrap py-3 pl-6 pr-3">
//         <div className="flex justify-end gap-3">
//           <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
//           <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
//         </div>
//       </td>
//     </tr>
//   );
// }

// export function InvoicesMobileSkeleton() {
//   return (
//     <div className="mb-2 w-full rounded-md bg-white p-4">
//       <div className="flex items-center justify-between border-b border-gray-100 pb-8">
//         <div className="flex items-center">
//           <div className="mr-2 h-8 w-8 rounded-full bg-gray-100"></div>
//           <div className="h-6 w-16 rounded bg-gray-100"></div>
//         </div>
//         <div className="h-6 w-16 rounded bg-gray-100"></div>
//       </div>
//       <div className="flex w-full items-center justify-between pt-4">
//         <div>
//           <div className="h-6 w-16 rounded bg-gray-100"></div>
//           <div className="mt-2 h-6 w-24 rounded bg-gray-100"></div>
//         </div>
//         <div className="flex justify-end gap-2">
//           <div className="h-10 w-10 rounded bg-gray-100"></div>
//           <div className="h-10 w-10 rounded bg-gray-100"></div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export function InvoicesTableSkeleton() {
//   return (
//     <div className="mt-6 flow-root">
//       <div className="inline-block min-w-full align-middle">
//         <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
//           <div className="md:hidden">
//             <InvoicesMobileSkeleton />
//             <InvoicesMobileSkeleton />
//             <InvoicesMobileSkeleton />
//             <InvoicesMobileSkeleton />
//             <InvoicesMobileSkeleton />
//             <InvoicesMobileSkeleton />
//           </div>
//           <table className="hidden min-w-full text-gray-900 md:table">
//             <thead className="rounded-lg text-left text-sm font-normal">
//               <tr>
//                 <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
//                   Customer
//                 </th>
//                 <th scope="col" className="px-3 py-5 font-medium">
//                   Email
//                 </th>
//                 <th scope="col" className="px-3 py-5 font-medium">
//                   Amount
//                 </th>
//                 <th scope="col" className="px-3 py-5 font-medium">
//                   Date
//                 </th>
//                 <th scope="col" className="px-3 py-5 font-medium">
//                   Status
//                 </th>
//                 <th
//                   scope="col"
//                   className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6"
//                 >
//                   <span className="sr-only">Edit</span>
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white">
//               <TableRowSkeleton />
//               <TableRowSkeleton />
//               <TableRowSkeleton />
//               <TableRowSkeleton />
//               <TableRowSkeleton />
//               <TableRowSkeleton />
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }
