
/*
    -Generar dos JSON, uno solo de mujeres y el otro de hombres
    -Imprimir un nuevo JSON con el nombre y apellido de las personas agrupador por Dirección IP, basándose en el primer grupo de dígitos, 0-100, 101-200, 201-300 etc.
*/

const exercisesTwo = (req, res) => {
    try{
        const { data } = req.body;

        if(data.length < 1){            
            return res.status(400).json({
                ok: true,
                message: ' There is no Data'
            })
        }

        const mens = [];
        const womens = [];
        const groups = [];
        let arrayLimitGroup = [];

        const arrayNumbers = data.map( e => {
            const {ip_address} = e;
            const firstPart = ip_address.split('.')[0];
            return firstPart;
        })
        const maxNum = Math.max(...arrayNumbers);

        let startNumber = 0;
        let endNumber = 0;
        while(endNumber < maxNum){
            endNumber+= 100;
            groups.push({
                group:`${startNumber}-${endNumber}`,
                persons:[]
            });
            startNumber = endNumber + 1;
            arrayLimitGroup.push(endNumber + 1);
        }

        data.forEach( (element) => {
            const {ip_address} = element;
            const firstPart = parseInt(ip_address.split('.')[0]);
            const indexGroup = arrayLimitGroup.findIndex( (limit) => firstPart < limit);

            // inser person by conditional 
            groups[indexGroup].persons.push({name: element.first_name, lastname: element.last_name});

            // insert man or woman
            (element.gender == 'Male') ? (mens.push(element)) : (womens.push(element))
        });

        res.status(200).json({
            ok: true,
            message:' Operation Successfully ',
            mens,
            womens,
            groups,
        });

    }catch(error){
        res.status(500).json({
            ok: false,
            message:'Error on the System'
        })
    }
};


module.exports = {
    exercisesTwo
}
