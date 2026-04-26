/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { Download, Github, Database, FileText, Code, CheckCircle, Server, Activity, ShieldCheck, ExternalLink, AlertTriangle, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function App() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePrint = async () => {
    if (!contentRef.current) return;
    
    setIsGenerating(true);
    try {
      const element = contentRef.current;
      const actionsBar = document.getElementById('actions-bar');
      if (actionsBar) actionsBar.style.display = 'none';
      
      const canvas = await html2canvas(element, { 
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      
      if (actionsBar) actionsBar.style.display = 'flex';
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const renderWidth = pdfWidth;
      const renderHeight = (canvas.height * renderWidth) / canvas.width;
      
      let position = 0;
      let heightLeft = renderHeight;
      
      pdf.addImage(imgData, 'PNG', 0, position, renderWidth, renderHeight);
      heightLeft -= pdfHeight;
      
      while (heightLeft > 0) {
        position = heightLeft - renderHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, renderWidth, renderHeight);
        heightLeft -= pdfHeight;
      }
      
      pdf.save('ADPO_Healthcare_Documentation.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      window.print(); // Fallback
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans py-8 px-4 sm:px-6 lg:px-8 print:bg-white print:py-0 print:px-0 box-border">
      <div ref={contentRef} className="max-w-5xl mx-auto space-y-10 print:space-y-6">
        
        {/* Actions Bar - Hidden on print */}
        <div id="actions-bar" className="flex flex-col items-end gap-2 print:hidden mb-2">
          <div className="flex items-center gap-3">
            <a 
              href="https://adpo-health-agent-dashboard.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-[11px] font-bold tracking-wide shadow-lg shadow-blue-200 transition-colors uppercase"
            >
              <ExternalLink size={16} />
              Open Live Dashboard (Vercel)
            </a>
            <button 
              onClick={handlePrint}
              disabled={isGenerating}
              className="inline-flex items-center gap-2 px-6 py-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-full text-[11px] font-bold tracking-wide shadow-lg shadow-slate-200 transition-colors uppercase"
            >
              {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
              {isGenerating ? 'Generating PDF...' : 'Download PDF directly'}
            </button>
          </div>
          <p className="text-[10px] text-slate-500 font-medium">
            *Downloads directly. If nothing happens, click the ↗️ "Open in new tab" icon in AI Studio first.
          </p>
        </div>

        {/* Cover Page Section */}
        <header id="cover" className="bg-white border-b-2 border-slate-200 p-8 md:p-12 rounded-xl shadow-sm print:shadow-none print:border-none print:px-0 print:py-4">
          <div className="flex flex-col md:flex-row justify-between items-start border-b border-slate-100 pb-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3 mt-1">
                <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold tracking-wider uppercase rounded-sm">Project Asset</span>
                <span className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">Documentation Portal</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-2">ADPO Healthcare Agent</h1>
              <h2 className="text-xl md:text-2xl font-light text-slate-600 mb-3 block">Autonomous Diagnostic Path Orchestrator</h2>
              <p className="text-slate-500 font-medium text-sm">Technical Portfolio & Deployment Specification Summary</p>
            </div>
            <div className="text-left md:text-right mt-6 md:mt-0 hidden sm:block print:hidden">
              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1.5">Last Build Status</div>
              <div className="flex items-center justify-start md:justify-end gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="font-mono text-xs font-bold text-slate-700">SUCCESS (0s-4fc2)</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1.5">Domain</div>
              <div className="text-sm font-medium text-slate-700">Healthcare AI / Clinical Laboratory Automation</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1.5">Platform</div>
              <div className="text-sm font-medium text-slate-700">Google Cloud Platform (GCP)</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1.5">Team Members</div>
              <div className="text-sm font-medium text-slate-700">Vinod Rai & Madhukar Boddukuri</div>
            </div>
          </div>
        </header>

        {/* Section 1: Source Code */}
        <section id="source-code" className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden print:border-none print:shadow-none print:break-inside-avoid">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 print:bg-transparent print:border-b-2 print:border-slate-800 print:px-0">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-widest flex items-center gap-2 print:text-black">
              <Code size={18} className="text-blue-600 print:text-black mt-[-2px]" /> A. Source Code & References
            </h3>
            <span className="text-[10px] bg-slate-200 px-2 py-1 rounded text-slate-600 font-bold uppercase tracking-tighter hidden sm:inline-block print:hidden">Root: /adpo-agent</span>
          </div>
          
          <div className="p-6 md:p-8">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Infrastructure References</h4>
            
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3 print:bg-transparent print:border-slate-300 print:text-slate-800">
              <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5 print:text-black" />
              <div className="text-xs text-amber-800 leading-relaxed print:text-black">
                <strong className="block mb-1 text-amber-900 print:text-black uppercase tracking-wide">GCP Access Permissions Required</strong>
                While the <strong>Vercel Dashboard</strong> is publicly accessible to anyone, the specific <strong>Google Cloud Console links</strong> below (Firestore, Cloud Build, Metrics) will <span className="font-semibold underline">still require explicit IAM access</span> to the <code className="bg-amber-100/50 px-1 py-0.5 rounded font-mono text-[10px] border border-amber-200 print:border-slate-300 print:bg-white text-amber-900 print:text-black">adpo-healthcare-agent</code> project. Hosting the dashboard on Vercel does not bypass Google Cloud's internal console security.
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              <div className="flex flex-col p-4 bg-white border border-slate-200 rounded-md shadow-sm transition hover:shadow-md">
                <span className="text-[10px] text-blue-600 font-bold uppercase mb-2 flex items-center gap-1.5"><Github size={14}/> ADPO Repository</span>
                <a href="https://github.com/vinod1rai249-max/adpo-agent" target="_blank" rel="noreferrer" className="text-xs font-mono text-slate-600 truncate underline hover:text-blue-600">vinod1rai249-max/adpo-agent</a>
              </div>
              <div className="flex flex-col p-4 bg-white border border-slate-200 rounded-md shadow-sm transition hover:shadow-md border-l-4 border-l-blue-500">
                <span className="text-[10px] text-blue-600 font-bold uppercase mb-2 flex items-center gap-1.5"><ExternalLink size={14}/> Live Dashboard URL (Public)</span>
                <a href="https://adpo-health-agent-dashboard.vercel.app/" target="_blank" rel="noreferrer" className="text-xs font-mono text-slate-600 truncate underline hover:text-blue-600">adpo-health-agent-dashboard.vercel.app</a>
              </div>
              <div className="flex flex-col p-4 bg-white border border-slate-200 rounded-md shadow-sm transition hover:shadow-md">
                <span className="text-[10px] text-blue-600 font-bold uppercase mb-2 flex items-center gap-1.5"><Database size={14}/> Firestore Database</span>
                <a href="https://console.cloud.google.com/firestore/databases/-default-/data/panel/audit_events/82BkP0HGxyu5oeeUEJKD?authuser=1&project=adpo-healthcare-agent&supportedpurview=project,folder" target="_blank" rel="noreferrer" className="text-xs font-mono text-slate-600 truncate underline hover:text-blue-600">adpo-healthcare-agent/-default-/</a>
              </div>
              <div className="flex flex-col p-4 bg-white border border-slate-200 rounded-md shadow-sm transition hover:shadow-md lg:col-span-1 sm:col-span-2">
                <span className="text-[10px] text-blue-600 font-bold uppercase mb-2 flex items-center gap-1.5"><Activity size={14}/> Cloud Build Pipelines</span>
                <a href="https://console.cloud.google.com/cloud-build/builds?referrer=search&authuser=1&project=adpo-healthcare-agent&supportedpurview=project,folder" target="_blank" rel="noreferrer" className="text-xs font-mono text-slate-600 truncate underline hover:text-blue-600">cloud-build/repositories/1st-gen</a>
              </div>
              <div className="flex flex-col p-4 bg-white border border-slate-200 rounded-md shadow-sm transition hover:shadow-md lg:col-span-2 sm:col-span-2">
                <span className="text-[10px] text-blue-600 font-bold uppercase mb-2 flex items-center gap-1.5"><Server size={14}/> Cloud Run Metrics</span>
                <a href="https://console.cloud.google.com/run/detail/us-central1/adpo-dashboard/observability/metrics?authuser=1&project=adpo-healthcare-agent" target="_blank" rel="noreferrer" className="text-xs font-mono text-slate-600 truncate underline hover:text-blue-600">observability/metrics?project=adpo...</a>
              </div>
            </div>

            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Architecture & Folder Structure</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { file: 'agent.py', desc: 'ADK orchestrator – the AI brain.' },
                { file: 'lab_rules.py', desc: 'Rule engine – looks up Firestore LOINC rules.' },
                { file: 'fhir_client.py', desc: 'FHIR connector – reads/writes FHIR resources.' },
                { file: 'audit.py', desc: 'Audit logger – writes to Firestore.' },
                { file: 'app.py', desc: 'FastAPI server – receives Pub/Sub messages.' },
                { file: 'test_data/', desc: 'Generates 8 synthetic FHIR patients.' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-slate-50 border border-slate-100 rounded-md print:border-slate-300">
                  <FileText className="text-blue-600 shrink-0 mt-0.5 print:text-black" size={16} />
                  <div>
                    <span className="font-bold text-slate-800 block text-xs tracking-wide uppercase mb-1">{item.file}</span>
                    <span className="text-slate-500 text-[11px] leading-relaxed italic">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Dataset */}
        <section id="dataset" className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden print:border-none print:shadow-none print:break-inside-avoid">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 print:bg-transparent print:border-b-2 print:border-slate-800 print:px-0">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-widest flex items-center gap-2 print:text-black">
              <Database size={18} className="text-blue-600 print:text-black mt-[-2px]" /> B. Dataset Specification
            </h3>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="p-6 md:p-8 bg-slate-900 rounded-xl text-slate-300 print:bg-white print:text-black print:border print:border-slate-300 shadow-inner">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 print:text-slate-600">
                  <ShieldCheck size={16}/> Reference ID: audit_events
                </span>
                <span className="self-start xl:self-auto px-3 py-1 bg-slate-800 rounded text-[10px] text-blue-300 border border-slate-700 font-bold uppercase tracking-wider print:bg-blue-50 print:text-blue-800 print:border-blue-200 shadow-sm">
                  HIPAA Compliant Synthetic Data
                </span>
              </div>
              <p className="text-sm leading-relaxed mb-8 text-slate-400 print:text-slate-700">
                Real patient data (PHI) cannot be used in development without a Business Associate Agreement. Therefore, all test data is <strong>synthetically generated</strong> to resemble authentic FHIR data, referring to no real persons.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 bg-slate-800 p-4 rounded-lg text-center print:border print:border-slate-200 print:bg-slate-50 flex items-center justify-center flex-col">
                  <div className="text-[10px] uppercase text-slate-500 font-bold mb-2 print:text-slate-600 tracking-wider">Dataset Location</div>
                  <div className="text-sm font-mono text-white print:text-slate-800 bg-slate-900 px-3 py-1.5 rounded-md print:bg-white border border-slate-700 print:border-slate-200">test_data/</div>
                </div>
                <div className="flex-1 bg-slate-800 p-4 rounded-lg text-center flex flex-col items-center justify-center print:border print:border-slate-200 print:bg-slate-50">
                  <div className="text-[10px] uppercase text-slate-500 font-bold mb-3 print:text-slate-600 tracking-wider">Access Link (GCP Console)</div>
                  <a href="https://console.cloud.google.com/firestore/databases/-default-/data/panel/audit_events/82BkP0HGxyu5oeeUEJKD?authuser=1&project=adpo-healthcare-agent&supportedpurview=project,folder" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold tracking-widest uppercase rounded shadow transition-colors print:bg-transparent print:text-blue-700 print:px-0 print:shadow-none text-center max-w-[200px] leading-tight">
                    View Synthetic Dataset in Firestore
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: README / Help File */}
        <section id="readme" className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden print:border-none print:shadow-none print:break-before-page">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 print:bg-transparent print:border-b-2 print:border-slate-800 print:px-0">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-widest flex items-center gap-2 print:text-black">
              <Server size={18} className="text-blue-600 print:text-black mt-[-2px]" /> C. Documentation / Workflow
            </h3>
          </div>
          
          <div className="p-6 md:p-8 space-y-12">
            {/* Flow */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Activity size={16} className="text-blue-600" /> Code Flow & Architecture
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="space-y-3 border-l-2 border-slate-200 pl-5 py-1 print:border-slate-400 hover:border-blue-400 transition-colors">
                  <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest flex items-center gap-2 print:text-black">
                    <span className="w-5 h-5 bg-blue-50 text-blue-600 rounded flex items-center justify-center font-bold text-xs shrink-0 print:border print:border-slate-300 print:bg-white print:text-black shadow-sm">1</span>
                    Ingestion
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed print:text-slate-700">Lab results enter via the Laboratory Information System (LIS). Events are emitted via Cloud Pub/Sub for asynchronous processing.</p>
                </div>

                <div className="space-y-3 border-l-2 border-slate-200 pl-5 py-1 print:border-slate-400 hover:border-blue-400 transition-colors">
                  <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest flex items-center gap-2 print:text-black">
                    <span className="w-5 h-5 bg-blue-50 text-blue-600 rounded flex items-center justify-center font-bold text-xs shrink-0 print:border print:border-slate-300 print:bg-white print:text-black shadow-sm">2</span>
                    Processing
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed print:text-slate-700">A FastAPI backend running on Cloud Run receives the events. It validates the incoming payloads and orchestrates the next steps.</p>
                </div>

                <div className="space-y-3 border-l-2 border-slate-200 pl-5 py-1 print:border-slate-400 hover:border-blue-400 transition-colors">
                  <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest flex items-center gap-2 print:text-black">
                    <span className="w-5 h-5 bg-blue-50 text-blue-600 rounded flex items-center justify-center font-bold text-xs shrink-0 print:border print:border-slate-300 print:bg-white print:text-black shadow-sm">3</span>
                    Evaluation
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed print:text-slate-700">The Clinical Rule Engine takes over. It compares results against LOINC taxonomy constraints and numeric thresholds stored in Firestore.</p>
                </div>

                <div className="space-y-3 border-l-2 border-slate-200 pl-5 py-1 print:border-slate-400 hover:border-blue-400 transition-colors">
                  <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest flex items-center gap-2 print:text-black">
                    <span className="w-5 h-5 bg-blue-50 text-blue-600 rounded flex items-center justify-center font-bold text-xs shrink-0 print:border print:border-slate-300 print:bg-white print:text-black shadow-sm">4</span>
                    Decision
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed print:text-slate-700">Reflex Dispatcher routes the case: <strong>NO_REFLEX</strong> (ignored), <strong>AUTO_ORDER</strong> (FHIR ServiceRequest created), or <strong>HITL</strong> (escalate to Human).</p>
                </div>

                <div className="space-y-3 border-l-2 border-slate-200 pl-5 py-1 sm:col-span-2 print:border-slate-400 hover:border-blue-400 transition-colors">
                  <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest flex items-center gap-2 print:text-black">
                    <span className="w-5 h-5 bg-blue-50 text-blue-600 rounded flex items-center justify-center font-bold text-xs shrink-0 print:border print:border-slate-300 print:bg-white print:text-black shadow-sm">5</span>
                    Audit & Explainability
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed print:text-slate-700">Every decision is converted to a plain-English explanation by Vertex AI. All actions are securely logged to Firestore and showcased on the Streamlit live dashboard.</p>
                </div>
              </div>
            </div>

            {/* Prerequisites & Steps */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
              <div className="lg:col-span-1 border border-slate-200 p-6 rounded-xl bg-slate-50 shadow-sm print:bg-transparent print:border-slate-300 self-start">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                  <CheckCircle size={16} className="text-blue-600" /> Prerequisites
                </h4>
                
                <div className="mb-6">
                  <strong className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-3 border-b border-slate-200 pb-2">Environment</strong>
                  <ul className="text-[11px] text-slate-600 space-y-2 list-none pl-1">
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-slate-400 rounded-full"></div>Python 3.11+</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-slate-400 rounded-full"></div>Docker Desktop</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-slate-400 rounded-full"></div>Google Cloud CLI</li>
                  </ul>
                </div>
                
                <div>
                  <strong className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-3 border-b border-slate-200 pb-2">GCP APIs Required</strong>
                  <ul className="text-[11px] text-slate-600 space-y-2 list-none pl-1">
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-400 rounded-full"></div>Cloud Healthcare API</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-400 rounded-full"></div>Vertex AI API</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-400 rounded-full"></div>Cloud Run & Build</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-400 rounded-full"></div>Pub/Sub & Firestore</li>
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-2">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                  <Activity size={16} className="text-blue-600" /> Steps to Run the Code
                </h4>
                <div className="space-y-4">
                  {[
                    { title: 'Authenticate with GCP', desc: 'Login to Google Cloud', code: 'gcloud auth application-default login' },
                    { title: 'Provision Resources', desc: 'Create a FHIR R4 store, Pub/Sub topics, database.' },
                    { title: 'Seed Firestore Rules', desc: 'Populate initial clinical rules', code: 'python seed_rules.py' },
                    { title: 'Generate Synthetic Test Data', desc: 'Create HIPAA-compliant PHI equivalents', code: 'python test_data/generate_test_data.py' },
                    { title: 'Deploy Serverless Backends', desc: 'Build using Cloud Build and deploy to Cloud Run.' },
                    { title: 'Launch Dashboard UI', desc: 'Start the Streamlit application', code: 'streamlit run dashboard.py' },
                  ].map((step, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 bg-white border border-slate-100 rounded-lg shadow-sm print:border-slate-300">
                      <div className="w-6 h-6 bg-blue-50 text-blue-600 rounded flex items-center justify-center font-bold text-[11px] shrink-0 print:border print:border-slate-300 print:bg-white">{idx + 1}</div>
                      <div className="flex-1 text-xs text-slate-600 leading-relaxed">
                        <strong className="text-slate-800 tracking-wide block mb-1">{step.title}</strong>
                        <span className="block mb-2">{step.desc}</span>
                        {step.code && <code className="block mt-1 bg-slate-800 border-l-2 border-blue-500 text-slate-200 font-mono text-[10px] p-2.5 rounded shadow-inner print:bg-slate-50 print:text-black print:border-slate-400">{step.code}</code>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-6 pb-2 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-400 font-bold tracking-widest uppercase gap-4 text-center sm:text-left print:hidden mb-4">
          <div>ADPO HEALTHCARE TECHNOLOGY GROUP &copy; {new Date().getFullYear()}</div>
          <div className="flex gap-6">
            <span>Generative & Agentic AI Bootcamp</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
