import { React, useEffect, useState } from "react";
import "./CenterSearch.scss";
import { CgCloseO } from "react-icons/cg";

const CenterSearchModal = (props) => {
  const {setModalOpen, setCoachData} = props
  const closeModal = () => {
    setModalOpen(false);
  };

  const [centerArray, setCenterArray] = useState([]);

  useEffect(()=>{
    console.log(props.centerData)
    setCenterArray([...props.centerData])
  }, [props.centerData])
 
  const centerClickHandler = (obj) => {
    closeModal()
    setCoachData((prev) => {
      return {...prev, center: obj.center_name, center_id: obj.center_id}
      
    })

  }
  return (
    <div className="center_search_modal_background">
      <div className="center_search_modal">
        {centerArray.map((obj,index)=>{
            return (
                <div className="center_info_container" key={index} onClick={() => {centerClickHandler(obj, index)}}>
                    <div className="center_info_title_container">
                      <div className="center_info_title">{obj.center_name}</div>
                    </div>
                    <div className="center_info_location_container">
                      <div className="center_info_location">{obj.center_street_address}</div>
                    </div>
                </div>
                )
        })}
      </div>
      <CgCloseO size={25} className="close_modal" onClick={closeModal} />
    </div>
  );
};
export default CenterSearchModal;
