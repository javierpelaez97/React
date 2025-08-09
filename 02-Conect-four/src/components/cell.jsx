

export function Cell ({children, index, updateBoard  }) {

    const handleClick = () =>{
        console.log('Pulsamos boton', index);
        updateBoard(index)
    }

    const disc = () => {
        if (children === null){
            return 'cell'
        }else if (children === 'R'){
            return 'disc red'
        }else if (children === 'Y'){
            return 'disc yellow'
        }
    }


    
    return(
        <>
            <div onClick={handleClick} className={disc()}>
                {}
            </div>
        </>
    )
}