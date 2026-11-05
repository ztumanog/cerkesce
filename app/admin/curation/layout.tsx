
import CurationSidebar from './CurationSidebar';
export default function CurationLayout({children}:{children:React.ReactNode}){
  return (
    <div style={{display:'flex', minHeight:'100vh'}}>
      <div style={{flex:'0 0 260px'}}><CurationSidebar /></div>
      <div style={{flex:'1 1 0', display:'flex', minWidth:0, overflow:'hidden'}}>{children}</div>
    </div>
  );
}
