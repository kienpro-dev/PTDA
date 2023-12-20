import '../assets/scss/components/AdminDataTable.scss';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import momo from '../assets/images/momo.png'
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import {AiFillDelete} from 'react-icons/ai'
import { FcViewDetails } from 'react-icons/fc';

const AdminDataTable = (props) => {
    
    const actionColumn = {
        field: "actions",
        headerName: "Action",
        width: 200,
        renderCell: (params) => {
            return (
                <div className='action'>
                    <div className='view'>
                    <Link to={`/${props.slug}/${params.row.id}`}>
                        <FaEdit/>
                    </Link>
                    </div>
                    
                    <div className='delete'>
                        <AiFillDelete/>
                    </div>

                    <div className='delete'>
                        <FcViewDetails/>
                    </div>
                </div>
            )
        }
    }


    return (
        <div className='admin-dataTable'>
            <DataGrid
                className='dataGrid'
                rows={props.rows}
                columns={[...props.columns, actionColumn]}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 8,
                        },
                    },
                }}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 }
                    },

                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
                disableColumnFilter
                disableColumnSelector
                disableDensitySelector
            />
        </div>
    )
}

export default AdminDataTable