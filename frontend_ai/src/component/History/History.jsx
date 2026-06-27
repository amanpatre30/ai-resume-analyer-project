import React, { useState, useEffect, useContext } from 'react'
import styles from "./History.module.css"
import Skeleton from "@mui/material/Skeleton"
import WithAuthHOC from '../../utils/HOC/withAuthHOC'
import axios from "../../utils/axios"
import { AuthContext } from '../../utils/AuthContext'

const History = () => {

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false)

  const { userInfo } = useContext(AuthContext)

  useEffect(() => {

    if (!userInfo?._id) return;

    const fetchUserData = async () => {

      setLoader(true)

      try {

        const results = await axios.get(
          `/api/resume/get/${userInfo?._id}`
        );

        console.log(results.data.resumes)

        setData(results?.data?.resumes || [])

      } catch (error) {

        console.log(error)

        setData([])

      } finally {

        setLoader(false)

      }

    }

    fetchUserData()

  }, [userInfo])

  return (
    <div className={styles.History}>

      <div className={styles.HistoryCardBlock}>

        {
          loader ? (
            <Skeleton
              variant='rectangular'
              sx={{ borderRadius: "20px" }}
              width={280}
              height={280}
            />
          ) : (
            <>
              {
                data.length > 0 ? (
                  data.map((item, index) => (
                    <div
                      className={styles.HistoryCard}
                      key={item?._id || index}
                    >
                      <div className={styles.cardPercentage}>
                        {item?.score || 0}%
                      </div>
                      <p>Resume Name:</p>
                      <p>
                        {item?.resume_name || "No Resume"}
                      </p>
                      <p className={styles.feedBackDescription}>
                        {
                          item?.feedback
                            ? item.feedback.length > 250
                              ? item.feedback.slice(0, 250) + "..."
                              : item.feedback
                            : "No Feedback Available"
                        }
                      </p>
                      <p
                        style={{
                          marginTop: "10px",
                          fontSize: "14px",
                          opacity: "0.7"
                        }}
                      >
                        {
                          item?.createdAt
                            ? new Date(item.createdAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric"
                              }
                            )
                            : "No Date"
                        }
                      </p>
                    </div>
                  ))
                ) : (
                  <div
                    style={{
                      width: "100%",
                      textAlign: "center",
                      marginTop: "50px",
                      fontSize: "24px",
                      fontWeight: "600"
                    }}
                  >
                    No History Found
                  </div>
                )
              }
            </>
          )
        }
      </div>
    </div>
  )
}
export default WithAuthHOC(History);