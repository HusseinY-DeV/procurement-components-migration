import React, { useCallback, useEffect, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf';
import { Tooltip } from "reactstrap";

//COPY pdf.worker.js to the JS folder MANUALLY from node_modules pdfjs-dist build
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;



export function PDFDocument({ reportName = "", allowPrint }) {

    const [pdfState, setPDFState] = useState({
        numPages: null,
        pageNumber: 1,
        defaultReportWidth: window.innerWidth < 1200 ? window.innerWidth - 100 : 800,
        reportWidth: window.innerWidth < 1200 ? window.innerWidth - 100 : 800,
        allowPrint: false,
        reportPath: `${process.env.PUBLIC_URL}/pdf/${reportName}`,
    });

    const [toolTipState, setToolTipState] = useState({
        firstPage: false,
        previousPage: false,
        nextPage: false,
        lastPage: false,
        zoomOut: false,
        actualSize: false,
        zoomIn: false,
        downloadPrint: false,
        zipfile: false,
        printAll: false,
    })

    const onDocumentLoad = useCallback(({ numPages }) => {
        setPDFState(prevState => {
            return {
                ...prevState,
                numPages,
                allowPrint
            };
        });
    }, [allowPrint]);

    const toggleTooltip = useCallback((_name) => (event) => {
        setToolTipState(prevState => {
            return {
                ...prevState,
                [_name]: !prevState[_name]
            }
        })
    }, []);

    const ZoomReport = useCallback((direction, state) => (e) => {
        let w = 0;
        switch (direction) {
            case "plus":
                w = state.reportWidth + 100;

                if (window.innerWidth > 1200) {
                    if (w > window.innerWidth) w = window.innerWidth;
                } else {
                    if (w > 1200) w = 1200;
                }
                setPDFState(prevState => {
                    return {
                        ...prevState,
                        reportWidth: w
                    }
                });
                break;
            case "minus":
                w = state.reportWidth - 100;
                if (w < 100) w = 100;
                setPDFState(prevState => {
                    return {
                        ...prevState,
                        reportWidth: w
                    }
                });
                break;
            default:
                setPDFState(prevState => {
                    return {
                        ...prevState,
                        reportWidth: prevState.defaultReportWidth
                    }
                });
        }
    }, []);

    const ReportNavigation = useCallback((direction, state) => (e) => {
        switch (direction) {
            case "First":
                if (state.pageNumber > 1) {
                    this.setState({
                        pageNumber: 1
                    })
                }
                break;
            case "Prev":
                if (state.pageNumber > 1) {
                    setPDFState(prevState => {
                        return {
                            ...prevState,
                            pageNumber: prevState.pageNumber - 1
                        }
                    })
                }
                break;
            case "Next":
                if (state.pageNumber < state.numPages) {
                    setPDFState(prevState => {
                        return {
                            ...prevState,
                            pageNumber: prevState.pageNumber + 1
                        }
                    })
                }
                break;
            case "Last":
                if (state.pageNumber < state.numPages) {
                    setPDFState(prevState => {
                        return {
                            ...prevState,
                            pageNumber: prevState.numPages
                        }
                    })
                }
                break;
            default:
            //Nothing to do
        }

    }, []);

    useEffect(() => {
        const { reportPath } = pdfState;
        const reportPathArr = reportPath.split("/");
        const reportNameState = reportPathArr[reportPathArr.length - 1];
        if (reportNameState === reportName) return;

        setPDFState(prevState => {
            return {
                ...prevState,
                pageNumber: 1,
                reportPath: `${process.env.PUBLIC_URL}/pdf/${reportName}`
            }
        })

    }, [reportName]);

    return (
        <div className="animated fadeIn" style={{ height: "calc(100% - 14px)" }}>
            <div className="pdfDocument pt-3 pb-3">
                <div style={{ textAlign: "center" }}>

                    <div id="document-pdf-bar" className="row">
                        <div className="col-12 col-md-4"></div>
                        <div className="col-12 col-md-4 sndbar" style={{ textAlign: "center" }}>

                            <i id="firstPage" style={{
                                marginRight: 20,
                                fontWeight: "bold", cursor: pdfState.pageNumber === 1 ? "text" : "pointer",
                                color: pdfState.pageNumber === 1 ? "silver" : "#20a8d8"
                            }}
                                className="fa fa-chevron-left" onClick={ReportNavigation("First", pdfState)}>
                                <i className="fa fa-chevron-left"></i>
                            </i>
                            <Tooltip isOpen={toolTipState.firstPage} target="firstPage" toggle={toggleTooltip("firstPage")}>First Page</Tooltip>

                            <i id="previousPage" style={{
                                fontWeight: "bold", cursor: pdfState.pageNumber === 1 ? "text" : "pointer",
                                color: pdfState.pageNumber === 1 ? "silver" : "#20a8d8"
                            }}
                                className="fa fa-chevron-left" onClick={ReportNavigation("Prev", pdfState)}></i>
                            <Tooltip isOpen={toolTipState.previousPage} target="previousPage" toggle={toggleTooltip("previousPage")}>Previous Page</Tooltip>

                            <span style={{ marginLeft: 15, marginRight: 15 }}>Page {pdfState.pageNumber} of {pdfState.numPages}</span>

                            <i id="nextPage" style={{
                                fontWeight: "bold", cursor: pdfState.pageNumber === pdfState.numPages ? "text" : "pointer",
                                color: pdfState.pageNumber === pdfState.numPages ? "silver" : "#20a8d8"
                            }}
                                className="fa fa-chevron-right" onClick={ReportNavigation("Next", pdfState)}></i>
                            <Tooltip isOpen={toolTipState.nextPage} target="nextPage" toggle={toggleTooltip("nextPage")}>Next Page</Tooltip>

                            <i id="lastPage" style={{
                                marginLeft: 20,
                                fontWeight: "bold", cursor: pdfState.pageNumber === pdfState.numPages ? "text" : "pointer",
                                color: pdfState.pageNumber === pdfState.numPages ? "silver" : "#20a8d8"
                            }}
                                className="fa fa-chevron-right" onClick={ReportNavigation("Last", pdfState)}>
                                <i className="fa fa-chevron-right"></i>
                            </i>
                            <Tooltip isOpen={toolTipState.lastPage} target="lastPage" toggle={toggleTooltip("lastPage")}>Last Page</Tooltip>

                        </div>

                        <div className="col-12 col-md-4 pdfControls" style={{ textAlign: "right" }}>

                            <i className="fa fa-search-minus" id="zoomOut" onClick={ZoomReport("minus", pdfState)}
                                style={{
                                    fontSize: "17px", fontWeight: "bold", cursor: "pointer", marginRight: 20,
                                    color: pdfState.reportWidth - 100 < 100 ? "silver" : "#20a8d8",
                                    pointerEvents: pdfState.reportWidth - 100 < 100 ? "none" : ""
                                }}>
                            </i>
                            <Tooltip isOpen={toolTipState.zoomOut} target="zoomOut" toggle={toggleTooltip("zoomOut")}>Zoom Out</Tooltip>

                            <i className="fa fa-search" id="actualSize" onClick={ZoomReport("default", pdfState)}
                                style={{ color: "#20a8d8", fontSize: "17px", fontWeight: "bold", cursor: "pointer", marginRight: 20 }}>
                            </i>
                            <Tooltip isOpen={toolTipState.actualSize} target="actualSize" toggle={toggleTooltip("actualSize")}>Reset</Tooltip>

                            {
                                window.innerWidth < 728
                                    ?
                                    <i className="fa fa-search-plus" id="zoomIn" onClick={ZoomReport("plus", pdfState)}
                                        style={{
                                            fontSize: "17px", fontWeight: "bold", cursor: "pointer", marginRight: 20,
                                            color: pdfState.reportWidth + 100 > 1200 ? "silver" : "#20a8d8",
                                            pointerEvents: pdfState.reportWidth + 100 > 1200 ? "none" : ""
                                        }}>
                                    </i>
                                    :
                                    <i className="fa fa-search-plus" id="zoomIn" onClick={ZoomReport("plus", pdfState)}
                                        style={{
                                            fontSize: "17px", fontWeight: "bold", cursor: "pointer", marginRight: 20,
                                            color: pdfState.reportWidth + 100 > window.innerWidth ? "silver" : "#20a8d8",
                                            pointerEvents: pdfState.reportWidth + 100 > window.innerWidth ? "none" : ""
                                        }}>
                                    </i>
                            }
                            <Tooltip isOpen={toolTipState.zoomIn} target="zoomIn" toggle={toggleTooltip("zoomIn")}>Zoom In</Tooltip>
                            {pdfState.allowPrint &&
                                <a href={pdfState.reportPath} id="downloadPrint" target="_blank" rel="noopener noreferrer">
                                    <i className="fa fa-download "
                                        style={{
                                            color: pdfState.allowPrint ? "#20a8d8" : "silver",
                                            cursor: pdfState.allowPrint ? "pointer" : "text",
                                            fontSize: "17px", fontWeight: "bold", marginRight: 20
                                        }}>
                                    </i>
                                    <Tooltip isOpen={toolTipState.downloadPrint} target="downloadPrint" toggle={toggleTooltip("downloadPrint")}>Download / Print</Tooltip>
                                </a>
                            }

                        </div>
                    </div>
                    <Document
                        renderMode={"canvas"}
                        options={{ workerSrc: "./js/pdf.worker.js" }}
                        className="text-center"
                        file={pdfState.reportPath}
                        onLoadSuccess={onDocumentLoad}
                        onLoadError={(error) => console.log(error)}
                        loading={<div className="text-info">Please wait!</div>}
                        noData={<div className="text-danger">No PDF file available!</div>}
                        error={<div className="text-danger">Failed to load PDF file!</div>}
                    >
                        <Page
                            pageNumber={pdfState.pageNumber}
                            width={pdfState.reportWidth}
                            renderAnnotations={true}
                            renderTextLayer={true}
                        //renderMode={"svg"}
                        />
                    </Document>

                    {
                        pdfState.reportPath &&
                        <p>Page {pdfState.pageNumber} of {pdfState.numPages}</p>
                    }

                </div>
            </div>
        </div>
    )
}

