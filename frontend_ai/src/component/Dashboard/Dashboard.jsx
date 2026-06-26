import React, { useState, useContext } from 'react';
import styles from "./Dashboard.module.css";
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import Skeleton from "@mui/material/Skeleton";
import WithAuthHOC from '../../utils/HOC/withAuthHOC';
import { AuthContext } from '../../utils/AuthContext';
import axios from '../../utils/axios';
const Dashboard = () => {
 const [resumeName, setResumeName] = useState("Upload Your Resume");
 const [resumeFile, setResumeFile] = useState(null);
 const [loading, setLoading] = useState(false);
 const [jobDesc, setJobDesc] = useState("");
 const [result, setResult] = useState(null);
 const { userInfo } = useContext(AuthContext);
 const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
   setResumeFile(file);
   setResumeName(file.name);
  }
 };
 const handleUpload = async () => {
  setResult(null);
  if (!jobDesc || !resumeFile) {
   alert(
    "Please fill job description & upload resume"
   );
   return;
  }
  setLoading(true);
  try {
   const formData = new FormData();
   formData.append("resume", resumeFile);
   formData.append("job_desc", jobDesc);
   formData.append("user", userInfo._id);
   const response = await axios.post(
    "/api/resume/addResume",
    formData
   );
   // console.log(response)
   setResult(response.data.data);
  } catch (error) {
   console.log(error);
   alert("Upload failed");
  } finally {
   setLoading(false);
  }

 };

 return (
  <div className={styles.Dashboard}>

   <div className={styles.DashboardLeft}>

    <div className={styles.DashboardHeader}>

     <div className={styles.DashboardHeaderTitle}>
      Smart Resume Screening
     </div>

     <div className={styles.DashboardHeaderLargeTitle}>
      Resume Match Score
     </div>

    </div>

    <div className={styles.alertInfo}>

     <div>🔔 Important Instructions :</div>

     <div className={styles.DashboardInstruction}>

      <div>
       📄 Please paste the complete job
       description in the field below.
      </div>

      <div>
       📎 Only PDF format (.pdf)
       resumes are accepted.
      </div>
     </div>
    </div>
    <div className={styles.DashboardUploadResume}>
     <div className={styles.DashboardResumeBlock}>
      {resumeName}
     </div>
     <div className={styles.DashboardInputField}>
      <label
       htmlFor='inputField'
       className={styles.analyzeAIBtn}
      >
       Upload Resume
      </label>
      <input
       type='file'
       accept='.pdf'
       id="inputField"
       onChange={handleFileChange}
      />
     </div>
    </div>
    <div className={styles.jobDesc}>
     <textarea
      value={jobDesc}
      onChange={(e) =>
       setJobDesc(e.target.value)
      }
      className={styles.textArea}
      placeholder='Paste Your Job Description'
      rows={10}
      cols={50}
     />
     <div
      className={styles.AnalyzeBtn}
      onClick={handleUpload}
     >
      {loading ? "Analyzing..." : "Analyze"}
     </div>
    </div>
   </div>
   <div className={styles.DashboardRight}>
    <div className={styles.DashboardRightTopCard}>
     <div>Analyze With AI</div>
     <img
      className={styles.profileImg}
      alt="profile"
      src={userInfo?.photoUrl}
     />
     <h2>{userInfo?.name}</h2>
    </div>

    {
     loading ? (

      <Skeleton
       variant='rectangular'
       sx={{ borderRadius: "20px" }}
       width={280}
       height={280}
      />

     ) : result ? (

      <div className={styles.DashboardRightTopCard}>

       <div>Result</div>

       <div
        style={{
         display: "flex",
         justifyContent: "center",
         alignItems: "center",
         gap: 20
        }}
       >
        <h1>
         {result?.score}%
        </h1>
        <CreditScoreIcon
         sx={{ fontSize: 22 }}
        />
       </div>
       <div className={styles.feedback}>
        <h2>Feedback</h2>
        <p className={styles.feedbackContent}>
         {result?.feedback}
        </p>
       </div>
      </div>

     ) : null
    }

   </div>

  </div>
 );
};

export default WithAuthHOC(Dashboard);