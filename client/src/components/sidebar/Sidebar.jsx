import classes from './sidebar.module.css';
import { sidebarData } from '../../utils/SidebarData';

const Sidebar = () => {
  return (
    <div className={classes.container}>
    <div className={classes.wrapper}>
      {sidebarData.map((data) => (
        <div key={crypto.randomUUID()} className={classes.item}>
          {data.icon}
          <span className={classes.text}>{data.text}</span>
        </div>
      ))}
    </div>
  </div>
  )
}

export default Sidebar