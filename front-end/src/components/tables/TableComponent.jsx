import React from 'react'

const TableComponent = ({isContact , datas }) => {
  return (
    <>
        <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase'>
                    <tr>
                        <th className='px-6 py-3 tracking-wider'>Sl No.</th>
                        <th className='px-6 py-3 tracking-wider'>Added Date</th>
                        <th className='px-6 py-3 tracking-wider'>Name</th>
                        <th className='px-6 py-3 tracking-wider'>Email</th>
                        {isContact && (
                            <th className='px-6 py-3 tracking-wider'>Phone no.</th>
                        )}
                    </tr>
                </thead>
                {datas?.length > 0 ? (
                    datas?.map((data , index) => (
                        <tbody key={data?._id} className='bg-white divide-y divide-gray-200'>
                            <td className='px-6 py-4 whitespace-nowrap'>{index + 1}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{new Date(data?.createdAt).toLocaleDateString()}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{data?.name}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{data?.email}</td>
                            {isContact && (
                                <td className='px-6 py-4 whitespace-nowrap'>{data?.phone}</td>
                            )}
                        </tbody>
                    ))
                ):(
                    <tbody>
                        <td rowSpan={5} className='px-6 py-4 whitespace-nowrap'>no data available</td>
                    </tbody>
                )}
            </table>
        </div>
    </>
  )
}

export default TableComponent