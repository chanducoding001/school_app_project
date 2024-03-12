import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxHeight: '80vh', // Set the maximum height as 80% of the viewport height
  overflowY: 'auto',  // Enable vertical scrolling if content exceeds the height
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const headingStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'sticky',
  top: "-35px",
  backgroundColor: '#fff', // Change this to your desired background color
  zIndex: 1, // Ensure it's above the content
  padding: '10px',
  width:"100%"
};
function createData(name, code, population, size, profilePicture, documents) {
  const density = population / size;
  return { name, code, population, size, density, profilePicture, documents };
}

const ViewEmployeeTable = ({ rows, columns }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [imgData, setImgData] = useState('');
  const [docsData, setDocsData] = useState([]);
  const [openImg, setOpenImg] = useState(false);
  const [openDocs, setOpenDocs] = useState(false);
  const [openView,setOpenView] = useState(false);
  const [rowViewData,setRowViewData] = useState({});
  const navigate = useNavigate();

  const handleOpen = (type) => {
    if (type === 'img') {
      setOpenImg(true);
    } else if (type === 'docs') {
      setOpenDocs(true);
    }else if(type === 'view'){
      setOpenView(true)
    }
  };

  const handleClose = (type) => {
    if (type === 'img') {
      setOpenImg(false);
    } else if (type === 'docs') {
      setOpenDocs(false);
    }else if(type === 'view'){
      setOpenView(false)
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const displayImage = async (id) => {
    const response = await fetch(`http://localhost:8000/files/${id}`);
    if (!response.ok) {
      console.log('response not ok');
    } else {
      const data = await response.json();
      setImgData(data);
      handleOpen('img');
    }
  };

  const displayDocuments = async (docs) => {
    const docsStr = docs.join('id');
    const response = await fetch(`http://localhost:8000/files/multiple/${docsStr}`);
    if (!response.ok) return;
    const data = await response.json();
    setDocsData(data.data);
    handleOpen('docs');
  };
  const displayView = (row)=>{
    const modifiedData = (({_id,createdAt,updatedAt,documents,profilePicture,__v, ...rest }) => rest)(row)
    handleOpen('view');
    setRowViewData(modifiedData);
  }
  const deleteEmployeeById = async (id)=>{
    try{
      const response = await fetch(`http://localhost:8000/employees/deleteEmployee/${id}`,{method:'DELETE'});
      if(!response.ok){
        console.log('delete unsuccessful');
        return;
      }else{
        const data  = await response.json();
        console.log('deleted data',data);
      }

    }catch(err){
      console.log(err);
    }
  }
  const getCellContent = (column, row) => {
    if (column.id === 'profilePicture') {
      return (
        <Button variant="outlined" onClick={() => displayImage(row.profilePicture)}>
          <ImageIcon />
        </Button>
      );
    } else if (column.id === 'documents') {
      return (
        <Button variant="outlined" onClick={() => displayDocuments(row.documents)}>
          <DescriptionIcon />
        </Button>
      );
    }else if(column.id === 'view'){
      return <Button variant="outlined" onClick={() =>{displayView(row)} }>
      <VisibilityIcon/>
    </Button>
    }else if(column.id === 'edit'){
      return <Button variant="outlined" onClick={() =>{navigate(`/editEmployee/${row["_id"]}`)} }>
      <EditIcon/>
    </Button>
    } else if(column.id === 'delete'){
      return <Button variant="outlined" onClick={() =>{deleteEmployeeById(row._id)} }>
      <DeleteIcon/>
    </Button>
    }else {
      return column.format && typeof row[column.id] === 'number'
        ? column.format(row[column.id])
        : row[column.id];
    }
  };

  const filteredRows = rows.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleDownload = (downloadData) => {
    const downloadLink = document.createElement('a');
    downloadLink.href = `data:${downloadData.contentType};base64,${downloadData.data}`;
    downloadLink.download = downloadData.fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TextField
        label="Search"
        variant="outlined"
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: '#f2f2f2',
                    fontSize: '1.2rem',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.code}
                  style={{
                    backgroundColor: rowIndex % 2 === 0 ? '#ffffff' : '#f9f9f9',
                  }}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        fontSize: '1rem',
                      }}
                    >
                      {getCellContent(column, row)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Modal
        open={openImg}
        onClose={() => handleClose('img')}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{display:'flex',justifyContent:'space-between'}}>
            <h2>Image Preview</h2>
            <Button onClick={() => handleClose('img')}>Close</Button> 
          </div>
          <img
            src={`data:${imgData.contentType};base64,${imgData.data}`}
            alt="File Preview"
          />
          <Button onClick={() => handleDownload(imgData)}>Download Image</Button>
        </Box>
      </Modal>
      <Modal
        open={openDocs}
        onClose={() => handleClose('docs')}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{display:'flex',justifyContent:'space-between'}}>
            <h2>Documents Preview</h2>
            <Button onClick={() => handleClose('docs')}>Close</Button> 
          </div>
          {/* Display your documents here */}
          {
            docsData.map((e,index)=>{
              return (
                <li key={index}>
                  <object
                  style={{width:'100%'}}
                  data={`data:${e.contentType};base64,${e.data}`}>
                  </object>
                  <Button onClick={()=>handleDownload(e)}>Download</Button>
                </li>
              )
            })
          }
        </Box>
      </Modal>
{/* view modal */}
<Modal
        keepMounted
        open={openView}
        onClose={()=>{handleClose('view')}}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
        <div style={headingStyle}>
          <h4>View Employee</h4>
          <Button sx={{ backgroundColor: 'aqua' }} onClick={() => handleClose('view')}>
            Close
          </Button>
        </div>
          {
            Object.entries(rowViewData).map(([key,value])=>{
              return <>
              <Typography sx={{textTransform:'capitalize',color:'blueviolet'}}>{key} </Typography>
              <input style={{padding:'none',height:"30px",width:"80%"}} readOnly value={value} className="field"/>
              </>
            })
          }
        </Box>
      </Modal>
    </Paper>
  );
};

export default ViewEmployeeTable;

