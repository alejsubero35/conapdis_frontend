import readXlsxFile from 'read-excel-file'

class excelService {
   async dataExcel(data:any,object:any)
    {
     const rows = await readXlsxFile(data)
       object = []
       delete rows[0]
       for (const values of Object.values(rows)) {
           const data_1 = {
               serial: values[0],
               fecha: values[1],
               plan_id: values[2],
               invoice_id: values[3]
           }

           object.push(data_1)

       }
       return rows
    }

}

export default new excelService();