import { connect, useDispatch } from "react-redux"
import { changeFilter } from "../reducers/filterReducer"

const Filter = (props) => {
    

    const handleChange = (event) => {
        const filterValue = event.target.value
        props.changeFilter(filterValue)
        
      }
      const style = {
        marginBottom: 10
      }
    
      return (
        <div style={style}>
          filter <input onChange={handleChange} />
        </div>
      )
}

const mapDispatchToProps = {
    changeFilter
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)
export default ConnectedFilter