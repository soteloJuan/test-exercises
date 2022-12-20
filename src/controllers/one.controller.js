
/*
    -Imprimir el nombre de las personas que son mayores de 50 años 
    -Calcular el imprimir el promedio de edad de mujeres y de hombres * falto
    -Imprimir el/los hobbies que más se repite
    -Imprimir el/los hobbies que menos se repite
*/

    const exercisesOne = (req, res) => {
    try{
        const {data} = req.body
        const {attributes} = data;
        
        if(attributes.length < 1){
            return res.status(400).json({
                ok: true,
                message: ' There is no Data'
            })
        }
        
        const older50 = [];
        const arrayHobbits = [];

        
        const arrayHobbitsCounter = [];
        attributes.forEach(element => {
            const arrayTempHobbies = element.hobbies;
            if(arrayTempHobbies){
                arrayTempHobbies.forEach( async(hobbie) => {
                    const exists = arrayHobbits.includes(hobbie)
                    if(!exists) {
                        arrayHobbits.push(hobbie);
                        arrayHobbitsCounter.push({hobbie, personts: 1})
                    }else{
                        const index = arrayHobbitsCounter.findIndex( e => e.hobbie == hobbie);
                        arrayHobbitsCounter[index].personts += 1;
                    }
                });
            }
            (element.edad > 50) && (older50.push(element.nombres));
        });

        const arrayNumberPersons = arrayHobbitsCounter.map( e => e.personts)
        const numMin =  Math.min(...arrayNumberPersons);
        const numMax =  Math.max(...arrayNumberPersons);
        const mostRepeatHobbie = arrayHobbitsCounter.filter( e => e.personts === numMax);
        const lessRepeatHobbie = arrayHobbitsCounter.filter( e => e.personts === numMin);


        res.status(200).json({
            ok: true,
            message:' Operation Successfully ',
            older50,
            mostRepeatHobbie,
            lessRepeatHobbie
        });

    }catch(error){
        res.status(500).json({
            ok: false,
            message:'Error on the System'
        })
    }
};



module.exports = {
    exercisesOne
}