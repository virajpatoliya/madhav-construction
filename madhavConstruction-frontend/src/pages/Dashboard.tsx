import ReusableModal from '@/components/ResuableModal';
import { IconCaretUpFilled, IconChevronLeft, IconChevronRight, IconClipboardFilled, IconDotsVertical, IconDownload, IconFileInvoiceFilled, IconFileSpreadsheet, IconGiftFilled, IconInfoCircleFilled, IconLayoutBoardFilled, IconListSearch, IconMoonFilled, IconPencil, IconPlus, IconReceiptRupeeFilled, IconRotateClockwise, IconSearch, IconSquareRoundedXFilled, IconSunFilled, IconTrashFilled, IconUserFilled, IconUsersPlus, IconX, IconZoomExclamationFilled } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GridLoader, MoonLoader } from 'react-spinners';
import { addLabour, getLabours, } from '@/service/labourService';
import { addKharcha, addMaterial, downloadKharchaPdf, deleteKharcha, deleteMaterial, downloadMaterialPdf, getKharcha, getKharchaTotals, getMaterial, getMaterialTotals, searchKharcha, searchMaterial, updateKharcha, updateMaterial } from '@/service/dashboardService';
import AnimatedSection from '@/components/AnimatedSection';
import Dropdown from '@/components/Dropdown';
import LabourWorkSheet from './Bills/LabourWorkSheet';
const FinalAmount = (salary: number, borrow: number): number => salary - borrow;

interface WorkData {
  id?: string;
  date: string;
  borrow: number;
  companyName: string;
  discription: string;
  workDay: string;
  extraMoney: number;
}

export interface Labour {
  id?: string;
  publicId: string;
  slug: string;
  labourName: string;
  companyName: string;
  salary: number;
  borrow: number;
  unpaid: number;
  totalBorrow: number;
  workData: WorkData[];
}

export interface Kharcha {
  id?: string;
  date: string;
  company: string;
  description: string;
  money: number;
}

export interface Material {
  id?: string;
  date: string;
  company: string;
  description: string;
  number: number;
  money: number;
}
interface Props {
  kharcha: Kharcha[];
  refreshData: () => void;
}
const Dashboard = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [labours, setLabours] = useState<Labour[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<ModalType>(null);
  const [query, setQuery] = useState("");
  const [formData, setFormData] = useState({
    labourName: "",
    companyName: "",
    salary: "",
    borrow: "",
    extraMoney: "",
    date: today,
    workDay: "Full day",
    discription: "",
  });
  // kharcha
  const [kharcha, setKharcha] = useState<Kharcha[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalKharchaComapny, setTotalKharchaComapny] = useState("");
  const [totalMyKharcha, setTotalMyKharcha] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [form, setForm] = useState<Kharcha>({
    date: today,
    company: "",
    description: "",
    money: 0,
  });
  const [selected, setSelected] = useState<Kharcha | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  //material
  const [material, setMaterial] = useState<Material[]>([]);
  const [pageMatrial, setPageMaterial] = useState(0);
  const [totalPagesMaterial, setTotalPagesMaterial] = useState(0);
  const [totalMaterialComapny, setTotalMaterialComapny] = useState("");
  const [totalMaterial, setTotalMaterial] = useState(0);
  const [searchTextMaterial, setSearchTextMaterial] = useState("");
  const [formMaterial, setFormMaterial] = useState<Material>({
    date: today,
    company: "",
    description: "",
    number: 0,
    money: 0,
  });
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [isEditingMaterial, setIsEditingMaterial] = useState(false);

  type ModalType = "my_Kharcha_Modal" | "material_Modal" | "refresh_kharcha" | "refresh_Material" | "search" | "addLabour" | null;



  const handleChangeAddLabour = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleSubmitAddLabour = async () => {
    try {
      const payload = {
        labourName: formData.labourName,
        companyName: formData.companyName,
        salary: Number(formData.salary),
        workData: [
          {
            date: formData.date,
            companyName: formData.companyName,
            discription: formData.discription,
            borrow: Number(formData.borrow),
            workDay: formData.workDay,
            extraMoney: formData.extraMoney
          },
        ],
      };

      const res = await addLabour(payload);
      navigate(`/labour/${res.slug}-${res.publicId}`);
    } catch (err) {
      console.error("Error saving labour", err);
    }
  };

  const handleSubmit = (bill) => {
    // do something
    navigate(`${bill}`); // redirect to About
  }

  const fetchKharcha = async () => {
    setLoading(true);
    try {
      const res = await getKharcha({ page, size: 5, company: searchText || undefined });
      const [totalCompanies, total] = await getKharchaTotals();

      setKharcha(res.content || []);
      setTotalPages(res.totalPages || 0);
      setTotalKharchaComapny(totalCompanies);
      setTotalMyKharcha(total);
    } catch (err) {
      console.error("Error fetching kharcha", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMaterial = async () => {
    setLoading(true);
    try {
      const res = await getMaterial({ page: pageMatrial, size: 5, company: searchTextMaterial || undefined });
      const [totalCompanies, total] = await getMaterialTotals();

      setMaterial(res.content || []);
      setTotalPagesMaterial(res.totalPages || 0);
      setTotalMaterialComapny(totalCompanies);
      setTotalMaterial(total);
    } catch (err) {
      console.error("Error fetching material", err);
    } finally {
      setLoading(false);
    }
  };



  const filteredLabours = labours.filter(labour =>
    labour.companyName.toLowerCase().includes(query.toLowerCase()) ||
    labour.labourName.toLowerCase().includes(query.toLowerCase())
  );


  const fetchSearchKharcha = async (company: string, page: number = 0) => {
    setLoading(true);
    try {
      const res = await searchKharcha(company, page, 5);
      setKharcha(res.content || []);
      setTotalPages(res.totalPages || 0);
    } catch (err) {
      console.error("Error searching kharcha", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchKharcha = () => {
    setPage(0);
    fetchSearchKharcha(searchText, 0);
  };

  const fetchSearchMaterial = async (company: string, page: number = 0) => {
    setLoading(true);
    try {
      const res = await searchMaterial(company, page, 5);
      setMaterial(res.content || []);
      setTotalPagesMaterial(res.totalPages || 0);
    } catch (err) {
      console.error("Error searching material", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchMaterial = () => {
    setPageMaterial(0);
    fetchSearchMaterial(searchTextMaterial, 0);
  };

  // ✅ Centralized refresh function
  const refreshKharchaData = async () => {
    setLoading(true);
    try {
      const res = await getKharcha({ page, size: 5, company: searchText || undefined });
      const [totalCompanies, total] = await getKharchaTotals();
      setKharcha(res.content || []);
      setTotalPages(res.totalPages || 0);
      setTotalKharchaComapny(totalCompanies);
      setTotalMyKharcha(total);
    } catch (err) {
      console.error("Error fetching kharcha:", err);
    } finally {
      setLoading(false);
    }
  };



  // ✅ on Mount + Pagination refresh
  useEffect(() => {
    refreshKharchaData();
  }, [page]);

  // ✅ Search with debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchText.trim().length > 0) {
        fetchSearchKharcha(searchText);
      } else {
        refreshKharchaData();
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchText]);



  // ✅ Add new kharcha
  const handleAddKharcha = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 🧱 Backend returns the saved kharcha object
      const newKharcha = await addKharcha(form);

      // ✅ Clear all input fields
      setForm({ date: today, company: "", description: "", money: 0 });
      setSearchText("");
      setPage(0);

      // ✅ Immediately update state with the new entry on top
      setKharcha(prev => [newKharcha, ...prev]);

      // ✅ Optionally refresh totals
      const [totalCompanies, total] = await getKharchaTotals();
      setTotalKharchaComapny(totalCompanies);
      setTotalMyKharcha(total);
      setModal(null); // close modal
    } catch (err) {
      console.error("Error adding kharcha:", err);
    }
  };

  const handleRowClick = (row: Kharcha) => {
    setSelected(row);
    setForm(row);
    setIsEditing(false); // ensure normal view first
  };

  const handleDelete = async () => {
    if (!selected?.id) return;
    if (window.confirm("Are you sure you want to delete this record?")) {
      await deleteKharcha(selected.id);
      alert("Deleted successfully!");
      setSelected(null);
      await fetchKharcha(); // refresh
    }
  };

  const handleUpdate = async () => {
    if (!selected?.id) return;
    await updateKharcha(selected.id, form);
    alert("Updated successfully!");
    setSelected(null);
    await fetchKharcha(); // refresh
  };



  // ✅ Centralized refresh function
  const refreshMaterialData = async () => {
    setLoading(true);
    try {
      const res = await getMaterial({ page: pageMatrial, size: 5, company: searchTextMaterial || undefined });
      const [totalCompanies, total] = await getMaterialTotals();
      setMaterial(res.content || []);
      setTotalPagesMaterial(res.totalPages || 0);
      setTotalMaterialComapny(totalCompanies);
      setTotalMaterial(total);
    } catch (err) {
      console.error("Error fetching Material:", err);
    } finally {
      setLoading(false);
    }
  };



  // ✅ on Mount + Pagination refresh
  useEffect(() => {
    refreshMaterialData();
  }, [pageMatrial]);

  // ✅ Search with debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchTextMaterial.trim().length > 0) {
        fetchSearchMaterial(searchTextMaterial);
      } else {
        refreshMaterialData();
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchTextMaterial]);



  // ✅ Add new kharcha
  const handleAddMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 🧱 Backend returns the saved kharcha object
      const newMaterial = await addMaterial(formMaterial);

      // ✅ Clear all input fields
      setFormMaterial({ date: today, company: "", description: "", number: 0, money: 0 });
      setSearchTextMaterial("");
      setPageMaterial(0);

      // ✅ Immediately update state with the new entry on top
      setMaterial(prev => [newMaterial, ...prev]);

      // ✅ Optionally refresh totals
      const [totalCompanies, total] = await getMaterialTotals();
      setTotalMaterialComapny(totalCompanies);
      setTotalMaterial(total);
      setModal(null); // close modal
    } catch (err) {
      console.error("Error adding Material:", err);
    }
  };



  const handleRowClickMaterial = (row: Material) => {
    setSelectedMaterial(row);
    setFormMaterial(row);
    setIsEditingMaterial(false); // ensure normal view first
  };

  const handleDeleteMaterial = async () => {
    if (!selectedMaterial?.id) return;
    if (window.confirm("Are you sure you want to delete this record?")) {
      await deleteMaterial(selectedMaterial.id);
      alert("Deleted successfully!");
      setSelectedMaterial(null);
      await fetchMaterial(); // refresh
    }
  };

  const handleUpdateMaterial = async () => {
    if (!selectedMaterial?.id) return;
    await updateMaterial(selectedMaterial.id, formMaterial);
    alert("Updated successfully!");
    setSelectedMaterial(null);
    await fetchMaterial(); // refresh
  };


  useEffect(() => {
    getLabours()
      .then((res) => {
        setLabours(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching labours:", err);
        setLoading(false);
      });
  }, []);


  const handleModal = (item: ModalType) => {
    setModal(item);
    if (item == "refresh_kharcha") {
      fetchKharcha();
    }
    else if (item == "refresh_Material") {
      fetchMaterial();
    }
  };

  return (
    <div className='w-full flex pt-8 md:pt-14 justify-center'>

      <div className='flex flex-col w-full  justify-center bg-white shadow-2xl  md:mt-10'>
        <div className="bg-blue-950 flex flex-row text-white items-center p-2 text-md font-medium mb-3">
          <div className="bg-yellow-500 w-7 h-7 mx-4 text-black rounded-full flex items-center justify-center">
            <IconChevronLeft stroke={2} onClick={() => navigate(-1)} size={25} />
          </div>
          <div>
            <div className='flex flex-row items-center'>
              <IconLayoutBoardFilled size={20} />
              <div className="text-lg font-bold">Dashboard</div>
            </div>
          </div>
        </div>

        <div className='flex flex-col space-y-1'>
          <label className='text-md font-extrabold px-4'>Quick Actions</label>

          <div className=' grid grid-cols-4 md:flex md:flex-row gap-2 md:gap-3 w-full px-4 '>
            <div className='flex flex-col items-center text-wrap gap-1'>
              <button
                type="submit"
                onClick={() => handleModal("addLabour")}
                className="flex flex-col font-bold text-xs  rounded-2xl p-3 bg-blue-950 transition-all duration-500 hover:bg-accent text-white w-16 h-16  items-center justify-center"
              >
                <IconUsersPlus stroke={3} size={25} />
              </button>
              <div className='font-medium text-wrap text-center text-xs'>
                Add Labour
              </div>
            </div>

            <div className='flex flex-col text-wrap items-center gap-1'>
              <button
                type="submit"
                onClick={() => handleModal("search")}
                className="flex flex-col font-bold text-xs rounded-2xl p-1 bg-blue-950 transition-all duration-500 hover:bg-accent text-white w-16 h-16  items-center justify-center"
              >
                <IconSearch stroke={3} size={25} />
              </button>
              <div className='font-medium text-nowrap text-center text-xs'>
                Search Labour
              </div>
            </div>


            <div className='flex flex-col items-center gap-1'>
              <button
                type="submit"
                onClick={() => handleSubmit('/invoicebill')}
                className="flex flex-col font-bold text-xs  rounded-2xl p-3 bg-blue-950 transition-all duration-500 hover:bg-accent text-white w-16 h-16  items-center justify-center"
              >
                <IconFileInvoiceFilled size={25} />
              </button>
              <div className='font-medium text-wrap text-center text-xs'>
                Invoice Bill
              </div>
            </div>

            <div className='flex flex-col items-center gap-1'>
              <button
                type="submit"
                onClick={() => handleSubmit('/mainbill')}
                className="flex flex-col font-bold text-xs  rounded-2xl p-3 bg-blue-950 transition-all duration-500 hover:bg-accent text-white w-16 h-16  items-center justify-center"
              >
                <IconClipboardFilled size={25} />
              </button>
              <div className='font-medium text-wrap text-center text-xs'>
                Main Bill
              </div>
            </div>

            <div className='flex flex-col items-center gap-1'>
              <button
                type="submit"
                onClick={() => handleSubmit('/measurementbill')}
                className="flex flex-col active:scale-95 font-bold text-xs  rounded-2xl p-3 bg-blue-950 transition-all duration-500 hover:bg-accent text-white w-16 h-16  items-center justify-center"
              >
                <IconReceiptRupeeFilled size={25} />
              </button>
              <div className='font-medium text-wrap text-center text-xs'>

                Measurement Sheet
              </div>
            </div>

            <div className='flex flex-col items-center gap-1'>
              <button
                type="submit"
                onClick={() => handleSubmit('/abstractbill')}
                className="flex flex-col active:scale-95 font-bold text-xs  rounded-2xl p-3 bg-blue-950 transition-all duration-500 hover:bg-accent text-white w-16 h-16  items-center justify-center"
              >
                <IconFileSpreadsheet size={25} />
              </button>
              <div className='font-medium text-wrap text-center text-xs'>

                Abstract Bill
              </div>
            </div>
          </div>
        </div>
        {modal == 'search' &&
          <AnimatedSection animation="fade-in-up" className='flex flex-col w-full  p-5 gap-1'>
            <label className='text-md font-extrabold'>Search Labour</label>
            <div className='flex flex-row items-center  gap-3 w-full'>
              <div className='flex flex-row outline-black w-full p-0.5 px-2 bg-gray-200 rounded-xl gap-1 items-center'>
                <div>
                  <IconSearch stroke={3} size={25} /></div>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  type='text' className='p-2 outline-none w-full bg-transparent' placeholder='Search labour here' />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="p-1 rounded-full hover:bg-gray-300 transition"
                  >
                    <IconSquareRoundedXFilled size={24} className="text-gray-600" />
                  </button>
                )}
              </div>
              <button onClick={() => setModal(null)} className='flex items-center bg-gray-200 rounded-xl p-3'><IconCaretUpFilled size={18} />
              </button>
            </div>
          </AnimatedSection>}

        <div className='flex flex-col p-4 '>
          <div className='flex flex-row gap-2 justify-between md:justify-start items-center '>
            <label className='text-md font-extrabold pb-1'>My Labours </label>
            {loading ? <MoonLoader size={15} speedMultiplier={2} /> :
              <span className='flex flex-row gap-1 p-0.5 text-xs font-bold px-1 bg-gray-200 rounded-md'><IconUserFilled size={15} />{labours.length}</span>
            } </div>
          <div className='flex flex-col md:flex-row w-full gap-3 py-2 overflow-y-scroll h-96 md:h-fit md:overflow-x-scroll no-scrollbar '>
            {filteredLabours.length > 0 ? (

              filteredLabours.map((items, index) => (
                <AnimatedSection key={index} animation="fade-in">
                  <div onClick={() => navigate(`/labour/${items.slug}-${items.publicId}`)}

                    className='flex flex-col hover:scale-[1.02] active:scale-95 active:bg-gray-300 hover:bg-gray-200 transition-all w-full md:w-fit border rounded-3xl bg-gray-100 p-4 cursor-pointer '>
                    <div className='flex w-full items-center justify-between font-semibold text-gray-500'>
                      <div className='flex flex-row gap-2 items-center'>
                        <span className='text-xs truncate'>{items.companyName}</span>
                        {items.totalBorrow == 0 ? <div className='bg-white rounded-full p-1 shadow-sm'><IconSunFilled size={20} /></div> : <div className='bg-white rounded-full p-1 shadow-sm'><IconMoonFilled size={20} /></div>}

                      </div>
                      <div className='flex flex-row gap-1 ml-1'>
                        {items.totalBorrow == 0 ? null : < IconGiftFilled size={20} />}
                        <IconInfoCircleFilled size={18} />
                      </div>
                    </div>
                    <div className='flex text-wrap md:text-nowrap text-4xl w-full font-black text-blue-950'>{items.labourName}</div>
                    <div className='flex flex-row gap-3 w-full pt-2 '>
                      <div className='flex flex-col w-full items-center rounded-xl p-3 font-bold bg-gray-200 gap-1'>
                        <label className='text-xs text-gray-500  font-bold'>Salary</label>
                        <div className='flex text-green-600 text-sm font-extrabold truncate overflow-x-scroll'>{items.salary}
                        </div>
                      </div>
                      <div className='flex flex-col w-full items-center rounded-xl p-3 font-bold bg-gray-200 gap-1'>
                        <label className='text-xs text-gray-500  font-bold'>Given</label>
                        <div className='flex text-blue-700 text-sm font-extrabold truncate'>{items.borrow}
                        </div>
                      </div>
                      <div className='flex flex-col w-full items-center rounded-xl p-3 font-bold bg-gray-200 gap-1'>
                        <label className='text-xs text-gray-500 text-nowrap  font-bold' >{items.unpaid < 0 ? "Take back" : "Unpaid"}</label>
                        <div className='flex text-red-700 text-sm font-extrabold truncate'>{Math.abs(items.unpaid)}
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))
            ) : (
              <div className='flex flex-col w-full items-center py-5'>
                <IconZoomExclamationFilled className='text-gray-500' size={60} />
                <p className="text-gray-500 text-center text-sm font-bold">No labour found!</p>
              </div>
            )}
          </div>
        </div>

        <div className='flex flex-col space-y-1 mt-4'>
          <div className='flex flex-col md:flex-row items-center w-full px-4 gap-3 '>
            {/* //Kharcha */}

            <div className='flex  flex-col my-4 gap-1 w-full '>
              <div className='flex flex-row gap-1 items-center justify-between'>
                <div className='flex flex-row gap-1 items-center '>
                  <label className='text-md font-extrabold'>My Kharcha</label>
                  {loading && <MoonLoader size={12} speedMultiplier={2} color='black' />}
                </div>
                <Dropdown
                  trigger={<div className="hover:bg-gray-100 text-gray-950 p-1 rounded-full">
                    <IconDotsVertical size={20} />
                  </div>}>
                  <button
                    onClick={downloadKharchaPdf}
                    className="flex items-center gap-2 w-full px-3 transition-all duration-300 py-2 text-left rounded-lg hover:bg-gray-200 hover:text-black-300 font-regular text-black "
                  >
                    <IconDownload size={18} stroke={3} />Download
                  </button>
                </Dropdown>
              </div>
              <div className='w-full flex flex-col  gap-3'>
                <div className='flex flex-row gap-3 overflow-x-scroll no-scrollbar md:overflow-none '>
                  <div className='flex flex-col bg-gray-100 w-full space-y-2 rounded-md p-3'>
                    <div className='flex flex-row justify-between items-center'>
                      <div className='text-sm font-medium  text-gray-500'>Total Kharcha</div>
                      <div className='text-gray-500 items-center'><IconInfoCircleFilled size={18} /></div>
                    </div>
                    {loading ?
                      <div className='p-4 w-48 rounded-lg animate-pulse bg-gray-300'> </div>
                      : <div className='text-2xl text-nowrap font-black  text-green-700'>Rs <span className='font-normal'>{totalMyKharcha}</span></div>
                    }
                  </div>

                  <div className='flex flex-col bg-gray-100 w-fit space-y-2 rounded-md p-3'>
                    <div className='flex flex-row gap-10 justify-between items-center'>
                      <div className='text-sm font-medium  text-gray-500'>Company</div>
                      <div className='text-gray-500 items-center'><IconInfoCircleFilled size={18} /></div>
                    </div>
                    <div className=' font-black  text-red-700'>{loading ? <div><GridLoader size={4} speedMultiplier={3} /> </div> : <div className='text-3xl'> {totalKharchaComapny} </div>}</div>
                  </div>
                </div>

                <div className='flex w-full flex-row gap-3 '>
                  <div className='px-3 w-full rounded-lg bg-gray-100  flex flex-row items-center gap-2'>
                    <IconSearch stroke={3} />
                    <input
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      className='p-2 placeholder:italic bg-transparent outline-none w-full' type="text" placeholder='Serach company here' />
                    {searchText && <div onClick={() => handleSearchKharcha()} className='flex rounded-sm p-1 bg-gray-300'> <IconListSearch /></div>}
                  </div>

                  <button onClick={() => handleModal("my_Kharcha_Modal")} className='flex flex-row p-1 px-3 w-fit rounded-lg bg-blue-950  items-center gap-2'>
                    <IconPlus stroke={5} size={18} className='text-white' />
                    <div className='text-white font-bold'>Add</div>
                  </button>

                  <button onClick={() => handleModal("refresh_kharcha")} className='flex flex-row p-1 px-3 w-fit rounded-lg bg-blue-950  items-center gap-2'>
                    <div className='text-white font-bold'><IconRotateClockwise size={18} /></div>
                  </button>

                </div>

                <div className='flex w-full'>
                  <div className="overflow-x-auto no-scrollbar h-64 w-full border-[1px] p-3 rounded-md bg-gray-100">
                    <table className="w-full ">

                      <thead>
                        <tr className="border-b-[1px] border-gray-300 py-2 text-gray-500 font-bold">
                          <th className="px-4 py-2 text-left ">Date</th>
                          <th className="px-4 py-2 text-left ">Company</th>
                          <th className="px-4 py-2 text-left ">Description</th>
                          <th className="px-4 py-2 text-left">Money</th>
                        </tr>
                      </thead>
                      {loading ?
                        <tbody>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <tr key={i} className="animate-pulse-fast w-full">
                              <td className="px-4 py-2">
                                <div className="h-6 bg-gray-300 rounded w-24"></div>
                              </td>
                              <td className="px-4 py-2">
                                <div className="h-6 bg-gray-300 rounded w-32"></div>
                              </td>
                              <td className="px-4 py-2">
                                <div className="h-6 bg-gray-300 rounded w-48"></div>
                              </td>
                              <td className="px-4 py-2">
                                <div className="h-6 bg-gray-300 rounded w-24"></div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        :
                        <tbody>
                          {kharcha?.length > 0 ? (
                            kharcha.map((row, i) => (
                              <tr
                                key={i}
                                onClick={() => handleRowClick(row)}
                                className="hover:bg-yellow-100 cursor-pointer transition-colors"
                              >
                                <td className="px-4 text-nowrap text-sm text-gray-500 font-medium py-2">
                                  {row.date}
                                </td>
                                <td className="px-4 text-nowrap text-sm text-red-700 font-bold py-2">
                                  {row.company}
                                </td>
                                <td className="px-4 text-sm hover:text-wrap truncate max-w-[150px] overflow-hidden whitespace-nowrap text-gray-500 font-medium py-2">
                                  {row.description}
                                </td>
                                <td className="px-4 text-sm text-green-700 font-black py-2">
                                  Rs.{row.money}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={4}>
                                <div className="flex flex-col w-full items-center py-5">
                                  <IconZoomExclamationFilled className="text-gray-500" size={60} />
                                  <p className="text-gray-500 text-center text-sm font-bold">
                                    No data found!
                                  </p>
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      }

                      {selected && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                          <div className="bg-white rounded-2xl shadow-xl p-6 w-[400px] relative">
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="text-lg font-bold ">
                                {isEditing ? "Edit Kharcha" : "View Kharcha"}
                              </h3>
                              <button
                                onClick={() => setSelected(null)}
                                className=" text-gray-500 hover:text-black"
                              >
                                <IconX size={20} stroke={3} />
                              </button>


                            </div>
                            {selected && (
                              <div className="">

                                {!isEditing ? (
                                  <>
                                    <div className='flex flex-col gap-3'>
                                      <p className="bg-gray-100 rounded-xl p-3 w-full">
                                        <strong>Company:</strong> {selected.company}
                                      </p>
                                      <p className="bg-gray-100 rounded-xl p-3 w-full">
                                        <strong>Date:</strong> {selected.date}
                                      </p>
                                      <p className="bg-gray-100 rounded-xl p-3 w-full">
                                        <strong>Description:</strong> {selected.description}
                                      </p>
                                      <p className="bg-gray-100 rounded-xl p-3 w-full">
                                        <strong>Amount:</strong> ₹{selected.money}
                                      </p>
                                    </div>

                                    <div className="flex justify-between mt-4 gap-3">
                                      <button
                                        onClick={() => setIsEditing(true)}
                                        className="bg-blue-950 text-white rounded-xl p-3 px-5 w-full font-bold"
                                      >
                                        Edit
                                      </button>

                                      <button
                                        onClick={handleDelete}
                                        className="bg-red-800 text-white rounded-xl p-3 px-5 w-full font-bold"   >
                                        Delete
                                      </button>
                                    </div>
                                  </>
                                ) : (
                                  <>

                                    <div className='flex flex-col gap-3'>
                                      <div className='flex flex-col gap-1'>
                                        <label className="block text-sm font-semibold text-gray-600">
                                          Company
                                        </label>
                                        <input
                                          className="bg-gray-100 rounded-xl p-3 w-full"
                                          value={form.company || ""}
                                          onChange={(e) => setForm({ ...form, company: e.target.value })}
                                        />
                                      </div>
                                      <div className='flex flex-col gap-1'>
                                        <label className="block text-sm font-semibold text-gray-600">
                                          Date
                                        </label>
                                        <input
                                          type="date"
                                          className="bg-gray-100 rounded-xl p-3 w-full"
                                          value={form.date || ""}
                                          onChange={(e) => setForm({ ...form, date: e.target.value })}
                                        />
                                      </div>
                                      <div className='flex flex-col gap-1'>
                                        <label className="block text-sm font-semibold text-gray-600 ">
                                          Description
                                        </label>
                                        <textarea
                                          className="bg-gray-100 rounded-xl p-3 w-full"
                                          value={form.description || ""}
                                          onChange={(e) => setForm({ ...form, description: e.target.value })}
                                        />
                                      </div>

                                      <div className='flex flex-col gap-1'>
                                        <label className="block text-sm font-semibold text-gray-600 mb-1">
                                          Amount
                                        </label>
                                        <input
                                          className="bg-gray-100 rounded-xl p-3 w-full"
                                          type="number"
                                          value={form.money || 0}
                                          onChange={(e) => setForm({ ...form, money: Number(e.target.value) })}
                                        />
                                      </div>
                                    </div>
                                    <div className="flex gap-3 mt-4 ">
                                      <button
                                        onClick={handleUpdate}
                                        className="bg-blue-950 text-white rounded-xl p-3 px-5 w-full font-bold"
                                      >
                                        Update
                                      </button>
                                      <button
                                        onClick={() => setIsEditing(false)}
                                        className="bg-red-800 text-white rounded-xl p-3 px-5 w-full font-bold"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </>
                                )}
                              </div>
                            )}


                          </div>
                        </div>
                      )}

                    </table>
                  </div>
                </div>
                <div className="flex gap-2 justify-center w-full overflow-x-auto ">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      className={`px-3 py-1 rounded-lg border ${i === page ? "bg-blue-950  font-bold text-white" : "bg-gray-100  font-bold text-blue-900"
                        }`}
                      onClick={() => setPage(i)}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Material table */}

            <div className='flex  flex-col my-4 gap-1 w-full '>
              <div className='flex flex-row gap-1 items-center justify-between'>
                <div className='flex flex-row gap-1 items-center '>
                  <label className='text-md font-extrabold'>Material</label>
                  {loading && <MoonLoader size={12} speedMultiplier={2} color='black' />}
                </div>
                <Dropdown
                  trigger={<div className="hover:bg-gray-100 text-gray-950 p-1 rounded-full">
                    <IconDotsVertical size={20} />
                  </div>}>
                  <button
                    onClick={downloadMaterialPdf}
                    className="flex items-center gap-2 w-full px-3 transition-all duration-300 py-2 text-left rounded-lg hover:bg-gray-200 hover:text-black-300 font-regular text-black "
                  >
                    <IconDownload size={18} stroke={3} />Download
                  </button>
                </Dropdown>
              </div>
              <div className='w-full flex flex-col  gap-3'>
                <div className='flex flex-row gap-3 overflow-x-scroll no-scrollbar md:overflow-none '>
                  <div className='flex flex-col bg-gray-100 w-full space-y-2 rounded-md p-3'>
                    <div className='flex flex-row justify-between items-center'>
                      <div className='text-sm font-medium  text-gray-500'>Total Material Kharcha</div>
                      <div className='text-gray-500 items-center'><IconInfoCircleFilled size={18} /></div>
                    </div>
                    {loading ?
                      <div className='p-4 w-48 rounded-lg animate-pulse bg-gray-300'> </div>
                      : <div className='text-2xl text-nowrap font-black  text-green-700'>Rs <span className='font-normal'>{totalMaterial}</span></div>
                    }
                  </div>

                  <div className='flex flex-col bg-gray-100 w-fit space-y-2 rounded-md p-3'>
                    <div className='flex flex-row gap-10 justify-between items-center'>
                      <div className='text-sm font-medium  text-gray-500'>Company</div>
                      <div className='text-gray-500 items-center'><IconInfoCircleFilled size={18} /></div>
                    </div>
                    <div className=' font-black  text-red-700'>{loading ? <div><GridLoader size={4} speedMultiplier={3} /> </div> : <div className='text-3xl'> {totalMaterialComapny} </div>}</div>
                  </div>
                </div>

                <div className='flex w-full flex-row gap-3 '>
                  <div className='px-3 w-full rounded-lg bg-gray-100  flex flex-row items-center gap-2'>
                    <IconSearch stroke={3} />
                    <input
                      value={searchTextMaterial}
                      onChange={(e) => setSearchTextMaterial(e.target.value)}
                      className='p-2 placeholder:italic bg-transparent outline-none w-full' type="text" placeholder='Serach company here' />
                    {searchTextMaterial && <div onClick={() => handleSearchMaterial()} className='flex rounded-sm p-1 bg-gray-300'> <IconListSearch /></div>}
                  </div>

                  <button onClick={() => handleModal("material_Modal")} className='flex flex-row p-1 px-3 w-fit rounded-lg bg-blue-950  items-center gap-2'>
                    <IconPlus stroke={5} size={18} className='text-white' />
                    <div className='text-white font-bold'>Add</div>
                  </button>

                  <button onClick={() => handleModal("refresh_Material")} className='flex flex-row p-1 px-3 w-fit rounded-lg bg-blue-950  items-center gap-2'>
                    <div className='text-white font-bold'><IconRotateClockwise size={18} /></div>
                  </button>

                </div>

                <div className='flex w-full'>
                  <div className="overflow-x-auto no-scrollbar h-64 w-full border-[1px] p-3 rounded-md bg-gray-100">
                    <table className="w-full ">

                      <thead>
                        <tr className="border-b-[1px] border-gray-300 py-2 text-gray-500 font-bold">
                          <th className="px-4 py-2 text-left ">Date</th>
                          <th className="px-4 py-2 text-left ">Company</th>
                          <th className="px-4 py-2 text-left ">Description</th>
                          <th className="px-4 py-2 text-left ">Number</th>
                          <th className="px-4 py-2 text-left">Money</th>
                        </tr>
                      </thead>


                      {loading ?
                        <tbody>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <tr key={i} className="animate-pulse-fast w-full">
                              <td className="px-4 py-2">
                                <div className="h-6 bg-gray-300 rounded w-24"></div>
                              </td>
                              <td className="px-4 py-2">
                                <div className="h-6 bg-gray-300 rounded w-32"></div>
                              </td>
                              <td className="px-4 py-2">
                                <div className="h-6 bg-gray-300 rounded w-48"></div>
                              </td>
                              <td className="px-4 py-2">
                                <div className="h-6 bg-gray-300 rounded w-24"></div>
                              </td>
                              <td className="px-4 py-2">
                                <div className="h-6 bg-gray-300 rounded w-24"></div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        :
                        <tbody >
                          {material?.length > 0 ? (
                            material.map((row, i) => (
                              <tr key={i}
                                onClick={() => handleRowClickMaterial(row)}
                                className="hover:bg-yellow-100 cursor-pointer transition-colors"
                              >
                                <td className="px-4 text-nowrap text-sm text-gray-500 font-medium py-2">{row.date}</td>
                                <td className="px-4 text-nowrap text-sm text-red-700 font-bold py-2">{row.company}</td>
                                <td className="px-4 text-sm hover:text-wrap truncate max-w-[150px] overflow-hidden whitespace-nowrap  text-gray-500 font-medium py-2">{row.description}</td>
                                <td className="px-4  text-sm text-black font-black py-2">{row.number}</td>
                                <td className="px-4  text-sm text-green-700 font-black py-2">Rs.{row.money}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={5} className="py-10 text-center">
                                <div className="flex flex-col items-center justify-center">
                                  <IconZoomExclamationFilled className="text-gray-500 mb-2" size={60} />
                                  <p className="text-gray-500 text-center text-sm font-bold">No data found!</p>
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>}

                      {selectedMaterial && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                          <div className="bg-white rounded-2xl shadow-xl p-6 w-[400px] relative">
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="text-lg font-bold ">
                                {isEditingMaterial ? "Edit Material" : "View Material"}
                              </h3>
                              <button
                                onClick={() => setSelectedMaterial(null)}
                                className=" text-gray-500 hover:text-black"
                              >
                                <IconX size={20} stroke={3} />
                              </button>


                            </div>
                            {selectedMaterial && (
                              <div className="">

                                {!isEditingMaterial ? (
                                  <>
                                    <div className='flex flex-col gap-3'>
                                      <p className="bg-gray-100 rounded-xl p-3 w-full">
                                        <strong>Company:</strong> {selectedMaterial.company}
                                      </p>
                                      <p className="bg-gray-100 rounded-xl p-3 w-full">
                                        <strong>Company:</strong> {selectedMaterial.date}
                                      </p>
                                      <p className="bg-gray-100 rounded-xl p-3 w-full">
                                        <strong>Description:</strong> {selectedMaterial.description}
                                      </p>
                                      <p className="bg-gray-100 rounded-xl p-3 w-full">
                                        <strong>Number:</strong> {selectedMaterial.number}
                                      </p>
                                      <p className="bg-gray-100 rounded-xl p-3 w-full">
                                        <strong>Money:</strong> ₹{selectedMaterial.money}
                                      </p>
                                    </div>

                                    <div className="flex justify-between mt-4 gap-3">
                                      <button
                                        onClick={() => setIsEditingMaterial(true)}
                                        className="bg-blue-950 text-white rounded-xl p-3 px-5 w-full font-bold"
                                      >
                                        Edit
                                      </button>

                                      <button
                                        onClick={handleDeleteMaterial}
                                        className="bg-red-800 text-white rounded-xl p-3 px-5 w-full font-bold"   >
                                        Delete
                                      </button>
                                    </div>
                                  </>
                                ) : (
                                  <>

                                    <div className='flex flex-col gap-3'>
                                      <div className='flex flex-col gap-1'>
                                        <label className="block text-sm font-semibold text-gray-600">
                                          Company
                                        </label>
                                        <input
                                          className="bg-gray-100 rounded-xl p-3 w-full"
                                          value={formMaterial.company || ""}
                                          onChange={(e) => setFormMaterial({ ...formMaterial, company: (e.target.value) })}
                                        />
                                      </div>
                                      <div className='flex flex-col gap-1'>
                                        <label className="block text-sm font-semibold text-gray-600">
                                          Date
                                        </label>
                                        <input
                                          type="date"
                                          className="bg-gray-100 rounded-xl p-3 w-full"
                                          value={formMaterial.date || ""}
                                          onChange={(e) => setFormMaterial({ ...formMaterial, date: (e.target.value) })}
                                        />
                                      </div>
                                      <div className='flex flex-col gap-1'>
                                        <label className="block text-sm font-semibold text-gray-600 ">
                                          Description
                                        </label>
                                        <textarea
                                          className="bg-gray-100 rounded-xl p-3 w-full"
                                          value={formMaterial.description || ""}
                                          onChange={(e) => setFormMaterial({ ...formMaterial, description: (e.target.value) })}
                                        />
                                      </div>

                                      <div className='flex flex-col gap-1'>
                                        <label className="block text-sm font-semibold text-gray-600 mb-1">
                                          Number
                                        </label>
                                        <input
                                          className="bg-gray-100 rounded-xl p-3 w-full"
                                          type="number"
                                          value={formMaterial.number || 0}
                                          onChange={(e) => setFormMaterial({ ...formMaterial, number: Number(e.target.value) })}
                                        />
                                      </div><div className='flex flex-col gap-1'>
                                        <label className="block text-sm font-semibold text-gray-600 mb-1">
                                          Amount
                                        </label>
                                        <input
                                          className="bg-gray-100 rounded-xl p-3 w-full"
                                          type="number"
                                          value={formMaterial.money || 0}
                                          onChange={(e) => setFormMaterial({ ...formMaterial, money: Number(e.target.value) })}
                                        />
                                      </div>
                                    </div>
                                    <div className="flex gap-3 mt-4 ">
                                      <button
                                        onClick={handleUpdateMaterial}
                                        className="bg-blue-950 text-white rounded-xl p-3 px-5 w-full font-bold"
                                      >
                                        Update
                                      </button>
                                      <button
                                        onClick={() => setIsEditingMaterial(false)}
                                        className="bg-red-800 text-white rounded-xl p-3 px-5 w-full font-bold"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </>
                                )}
                              </div>
                            )}


                          </div>
                        </div>
                      )}

                    </table>
                  </div>
                </div>
                <div className="flex gap-2 justify-center w-full overflow-x-auto ">
                  {[...Array(totalPagesMaterial)].map((_, i) => (
                    <button
                      key={i}
                      className={`px-3 py-1 rounded-lg border ${i === pageMatrial ? "bg-blue-950  font-bold text-white" : "bg-gray-100  font-bold text-blue-900"
                        }`}
                      onClick={() => setPageMaterial(i)}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>


            {/* addlabour */}
            {modal == "addLabour" && <div className='fixed top-0 p-3 left-0 w-screen h-screen bg-black/50 backdrop-blur-md duration-300 transition-all  z-50 flex justify-center items-center'>
              <div className='bg-white  md:w-1/2 rounded-3xl p-5 relative'>
                <div className='flex flex-col gap-2 w-full'>

                  <div className='flex flex-col w-full'>
                    <div className='flex flex-row text-xl text-gray-950 items-center font-medium justify-between w-full'>
                      <label className='flex flex-row items-center'>Add new  <span className='font-extrabold pl-1'>Labour</span><IconChevronRight stroke={5} size={20} /> </label>
                      <IconInfoCircleFilled size={18} />
                    </div>
                    <div className='text-xs text-gray-400 font-medium '>
                      Be caution once you create account you can't edit details only can delete acount.
                    </div>
                  </div>


                  <div className='flex flex-row gap-3 mt-3 w-full'>
                    <div className='flex font-medium text-sm flex-col w-fit'>
                      <label className='px-2'>Name</label>
                      <input
                        value={formData.labourName}
                        name="labourName"
                        type="text"
                        onChange={handleChangeAddLabour} required className='border-2 outline-black bg-gray-100 border-none rounded-xl p-3 w-full' placeholder='Labour name' />
                    </div>
                    <div className='flex font-medium text-sm flex-col w-fit'>
                      <label className='px-2'>Salary</label>
                      <input
                        value={formData.salary}
                        name="salary"
                        onChange={handleChangeAddLabour} required className='border-2 outline-black bg-gray-100 border-none rounded-xl p-3 w-full' type="number" placeholder='Enter money' />
                    </div>
                    <div className='flex font-medium text-sm flex-col w-full'>
                      <label className='px-2'>Company</label>
                      <input
                        value={formData.companyName}
                        name="companyName"
                        onChange={handleChangeAddLabour} required className='border-2 outline-black bg-gray-100 border-none rounded-xl p-3 w-full' type="text" placeholder='Enter company name' />
                    </div>


                  </div>
                  <div className='flex flex-row gap-3 mt-3 w-full'>

                    <div className='flex flex-col md:flex-row w-fit gap-3  items-center justify-center'>
                      <div className='flex font-medium text-sm flex-col w-full'>
                        <label className='px-2'>Work time</label>

                        <select
                          name="workDay"
                          value={formData.workDay}
                          onChange={handleChangeAddLabour}
                          required
                          className='border-2 bg-gray-100 border-none rounded-xl p-3 w-fit'
                        >
                          <option value="Full day">Full day</option>
                          <option value="Half day">Half day</option>
                          <option value="Full night">Full Night</option>
                          <option value="Half night">Half Night</option>
                          <option value="Leave">Leave</option>
                        </select>
                      </div>
                    </div>
                    {(formData.workDay === "Full night" || formData.workDay === "Half night") && (
                      <div className='flex font-medium text-sm flex-col w-fit'>
                        <label className='px-2'>Extra Money</label>
                        <input
                          value={formData.extraMoney}
                          name="extraMoney"
                          onChange={handleChangeAddLabour}
                          required className='border-2 outline-black bg-gray-100 border-none rounded-xl p-3 w-full' type="number" placeholder='Enter money' />
                      </div>
                    )}
                    <div className='flex font-medium text-sm flex-col w-full'>
                      <label className='px-2'>Description</label>
                      <input
                        value={formData.discription}
                        name="discription"
                        onChange={handleChangeAddLabour} required className='border-2 outline-black bg-gray-100 border-none rounded-xl p-3 w-full' type="text" placeholder='Write ' />
                    </div>
                    <div className='flex font-medium text-sm flex-col w-fit'>
                      <label className='px-2'>Borrow</label>
                      <input
                        value={formData.borrow}
                        name="borrow"
                        onChange={handleChangeAddLabour} required className='border-2 outline-black bg-gray-100 border-none rounded-xl p-3 w-full' type="number" placeholder='Enter money' />
                    </div>
                  </div>


                  <div className='flex flex-row gap-3 w-full items-center justify-between'>
                    <div className='flex font-medium text-sm flex-col w-fit'>
                      <label className='px-2'>Date</label>
                      <input
                        value={formData.date}
                        name="date"
                        onChange={handleChangeAddLabour} id='date' required className='border-2 outline-black bg-gray-100 border-none rounded-xl p-3 w-full' type="date" placeholder='Write ' />
                    </div>

                    <div className='flex flex-row gap-2 w-fit mt-5 text-sm items-center'>
                      <button onClick={() => setModal(null)} className='bg-red-600 text-white rounded-xl p-2.5 px-3 font-bold'>Cancel</button>
                      <button onClick={handleSubmitAddLabour}
                        type="submit" className='bg-blue-950 text-white rounded-xl p-2.5 px-5 font-bold'>Save</button>
                    </div>

                  </div>
                  <div className='text-xs text-red-400 font-medium italic'>
                    *Please fill all field given above, don't save null data.
                  </div>
                </div>
              </div>
            </div>
            }
          </div>
        </div>


        {/* labour table */}
        <div className='flex px-4 gap-3 w-full '>
          <LabourWorkSheet />
        </div>

        <ReusableModal
          handle={handleAddMaterial}
          isOpen={modal === "material_Modal"}
          onClose={() => setModal(null)}
          title="Material"
          subtitle="Be caution once you entered data you can't edit or delete it later."
        >
          <div className="flex flex-row gap-3 w-full">
            <div className="flex font-medium text-sm flex-col w-full">
              <label className="px-2">Company</label>
              <input
                value={formMaterial.company}
                onChange={(e) => setFormMaterial({ ...formMaterial, company: e.target.value })}
                className=" bg-gray-100 rounded-xl p-3 w-full"
                type="text"
                placeholder="Enter company name"
              />
            </div>

            <div className="flex font-medium text-sm flex-col w-fit">
              <label className="px-2">Money</label>
              <input
                value={formMaterial.money}
                onChange={(e) => setFormMaterial({ ...formMaterial, money: Number(e.target.value) })}
                className=" bg-gray-100 rounded-xl p-3 w-full"
                type="number"
                placeholder="Enter money"
              />
            </div>
          </div>

          <div className="flex flex-row gap-3 w-full">
            <div className="flex font-medium text-sm flex-col w-fit">
              <label className="px-2">Number</label>
              <input
                value={formMaterial.number}
                onChange={(e) => setFormMaterial({ ...formMaterial, number: Number(e.target.value) })}
                className=" bg-gray-100 rounded-xl p-3 w-full"
                type="number"
                placeholder="number"
              />
            </div>

            <div className="flex font-medium text-sm flex-col w-full">
              <label className="px-2">Description</label>
              <input
                value={formMaterial.description}
                onChange={(e) => setFormMaterial({ ...formMaterial, description: e.target.value })}
                className=" bg-gray-100 rounded-xl p-3 w-full"
                type="text"
                placeholder="Write"
              />
            </div>
          </div>

          {/* ✅ Date + Buttons same row */}
          <div className="flex flex-row gap-3 w-full items-center justify-between">
            <div className="flex font-medium text-sm flex-col w-fit">
              <label className="px-2">Date</label>
              <input
                value={formMaterial.date}
                onChange={(e) => setFormMaterial({ ...formMaterial, date: e.target.value })}
                className=" bg-gray-100 rounded-xl p-3 w-full"
                type="date"
              />
            </div>

            <div className="flex flex-row gap-2 w-fit mt-5 text-sm items-center">
              <button
                onClick={() => setModal(null)}
                className="bg-red-600 text-white rounded-xl p-2.5 px-3 font-bold"
              >
                Cancel
              </button>
              <button type='submit' className="bg-blue-950 text-white rounded-xl p-2.5 px-5 font-bold">
                Save
              </button>
            </div>
          </div>
        </ReusableModal>


        <ReusableModal
          handle={handleAddKharcha}
          isOpen={modal === "my_Kharcha_Modal"}
          onClose={() => setModal(null)}
          title="My Kharcha"
          subtitle="Be caution once you entered data you can't edit or delete it later."
        >
          <div className="flex flex-row gap-3 w-full">
            <div className="flex font-medium text-sm flex-col w-full">
              <label className="px-2">Company</label>
              <input
                type="text"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })} className=" bg-gray-100 rounded-xl p-3 w-full" placeholder="Enter company name" />
            </div>

            <div className="flex font-medium text-sm flex-col w-fit">
              <label className="px-2">Money</label>
              <input
                type="number"
                value={form.money}
                onChange={(e) => setForm({ ...form, money: Number(e.target.value) })} className=" bg-gray-100 rounded-xl p-3 w-full" placeholder="Enter money" />
            </div>
          </div>

          <div className="flex font-medium text-sm flex-col w-full">
            <label className="px-2">Description</label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })} className=" bg-gray-100 rounded-xl p-3 w-full" placeholder="Write" />
          </div>

          {/* ✅ Date + Buttons in same row */}
          <div className="flex flex-row gap-3 w-full items-center justify-between">
            <div className="flex font-medium text-sm flex-col w-fit">
              <label className="px-2">Date</label>
              <input type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })} className=" bg-gray-100 rounded-xl p-3 w-full" />
            </div>

            <div className="flex flex-row gap-2 w-fit mt-5 text-sm items-center">
              <button onClick={() => setModal(null)} className="bg-red-600 text-white rounded-xl p-2.5 px-3 font-bold">
                Cancel
              </button>
              <button type="submit" className="bg-blue-950 text-white rounded-xl p-2.5 px-5 font-bold">
                Save
              </button>
            </div>
          </div>
        </ReusableModal>
      </div >
    </div >
  )
}
export default Dashboard
