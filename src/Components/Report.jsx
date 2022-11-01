import React, { useState } from "react";
import { readFile, utils } from "xlsx";
import { Button, Tab, ButtonGroup, Input } from "./Styling";
const api_key = "9499054f-a822-4107-b312-f22d0be572ef";
const api_secret = "NzI2YmQyNjUtYTg4NS00ZDVhLTkyN2UtYTUxNmEyZWM0ZWEy";
const sub_id = "89f9edae-049e-4af1-8c58-171dd464f9ad";

function postToBoard(report) {
  console.log(api_key, api_secret, sub_id);
  var url = `https://platform.vestaboard.com/subscriptions/${sub_id}/message`;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url);

  xhr.setRequestHeader("X-Vestaboard-Api-Key", api_key);
  xhr.setRequestHeader("X-Vestaboard-Api-Secret", api_secret);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
    }
  };

  let message = report.text.replace(/\n/g, "\\n");
  message = message.replace("\n", "\\n");
  console.log(message);

  var data = `{"text":"${message}"}`;
  console.log(data);

  xhr.send(data);
}

function getReportString(title, jsonData) {
  let reportString = title + "\n";
  for (let i = 1; i < jsonData.length; i++) {
    reportString += jsonData[i][0] + " " + jsonData[i][1] + "\n";
    console.log(reportString);
  }
  return reportString;
}

export const Report = () => {
  const [report_info, setReportText] = useState({
    name: "Upload a file",
    text: ""
  });
  const [report_sheets, setSheetOptions] = useState([]);
  const [FILE, setFile] = useState();
  const [active, setActive] = useState("");

  const handleReportChange = (event) => {
    let message = event.target.value;
    setReportText({ name: report_info.name, text: message });
    let checker = report_info.text;
    console.log(checker);
  };
  const clearThing = () => {
    setSheetOptions([]);
    setReportText({ name: "Upload a file", text: "" });
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.log("no file");
      return;
    }
    setFile(file);
    const data = await file.arrayBuffer();
    const workbook = readFile(data, { sheetRows: 5 });
    console.log("File uploaded ", file.name);
    if (file) {
      for (let i = 0; i < Object.keys(workbook.SheetNames).length; i++) {
        setSheetOptions(report_sheets.concat(Object.keys(workbook.Sheets)[i]));
        report_sheets.push(Object.keys(workbook.Sheets)[i]);
      }
      console.log("Found reports:", report_sheets);
      setReportText({ name: "Upload a file", text: "" });
    }
  };

  const loadReport = async (report) => {
    setActive(report);
    console.log("Loading report...", report);

    if (!FILE) {
      console.log("no file");
      return;
    }
    const data = await FILE.arrayBuffer();
    const workbook = readFile(data, { sheetRows: 5 });
    const ws = workbook.Sheets[report];
    const jsonData = utils.sheet_to_json(ws, {
      header: 1,
      defval: ""
    });

    const reportString = getReportString(report, jsonData);
    console.log(reportString);
    setReportText({ name: report, text: reportString });
  };

  return (
    <div>
      <div>
        <h3>Available Reports:</h3>
        <Button onClick={() => clearThing()}>Clear Reports</Button>
        <ButtonGroup>
          {report_sheets.map((report) => (
            <Tab
              key={report}
              active={active === report}
              onClick={() => loadReport(report)}
            >
              {report}
            </Tab>
          ))}
        </ButtonGroup>
      </div>
      <Input type="file" onChange={(e) => handleFileUpload(e)} />
      <div>
        <textarea
          id={report_info.name}
          value={report_info.text}
          onChange={handleReportChange}
          placeholder="Upload a file and select a report or type your own message!"
        />
      </div>
      <div>
        <Button onClick={() => postToBoard(report_info)}>Post</Button>
      </div>
    </div>
  );
};
