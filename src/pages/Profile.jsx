import React, { useContext, useState, useEffect } from 'react';
import logoDumb from '../components/assets/Frame.png';
import cssModule from '../components/Profile.module.css';
import Navigation from '../components/Navigation.jsx';
import convertRupiah from "rupiah-format";
import { UserContext } from '../context/userContext'
import { useQuery } from "react-query";
import { API } from "../config/api";
import dateFormat from "dateformat";

function Profile() {
    const title = "Profile";
    document.title = "DumbMerch | " + title;

    const [state] = useContext(UserContext);
    const [dataProfile, setDataProfile] = useState()

    let { data: profile, refetch: profileRefetch } = useQuery(
        "profileCache",
        async () => {
          const response = await API.get("/profile");
          console.log(response)
          return setDataProfile(response.data.data);
        }
    );

      let { data: transactions, refetch: transactionsRefetch } = useQuery(
        "transactionsCache",
        async () => {
          const response = await API.get("/transactions");
          console.log(response)
          return response.data.data.transaction;
        }
      );

    return (

        <div className={cssModule.ProfileC}>

            <Navigation title={title} />

            <div className={cssModule.mainContainer}>

                <div className={cssModule.leftSide}>
                    <div className={cssModule.leftSideLeft}>
                        <h2>My Profile</h2>
                        <img src={dataProfile?.image ? dataProfile.image : logoDumb} />
                    </div>
                    <div className={cssModule.leftSideRight}>
                        <div>
                            <h3>Name</h3>
                            <p>{state.user.name}</p>
                        </div>
                        <div>
                            <h3>Email</h3>
                            <p>{state.user.email}</p>
                        </div>
                        <div>
                            <h3>Phone</h3>
                            <p>{dataProfile?.phone ? dataProfile?.phone : "-"}</p>
                        </div>
                        <div>
                            <h3>Gender</h3>
                            <p>{dataProfile?.gender ? dataProfile?.gender : "-"}</p>
                        </div>
                        <div>
                            <h3>Address</h3>
                            <p>{dataProfile?.address ? dataProfile?.address : "-"}</p>
                        </div>
                    </div>
                </div>
                <div className={cssModule.rightSide}>
                    <h2>My Transaction</h2>
                    {transactions?.map((item, index) => (
                    <div className={cssModule.transactionCont} key={index}>
                        <div className={cssModule.trImg}>
                            <img src={item.product.image} alt={item.product.name} />
                        </div>
                        <div className={cssModule.trDetail}>
                            <h3>{item.product.name}</h3>
                            <p className={cssModule.trDetail2}>{dateFormat(item.createdAt, "dddd, d mmmm yyyy")}</p>
                            <p className={cssModule.trDetail3}>Price : {convertRupiah.convert(item.price)}</p>
                            <p className={cssModule.trDetail4}>Sub Total : {convertRupiah.convert(item.price)}</p>
                        </div>
                        <div
                            className={`${cssModule.trLogoImg} status-transaction-${item.status} h-100 d-flex align-items-center justify-content-center`}
                          >
                            <span>{item.status}</span>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Profile