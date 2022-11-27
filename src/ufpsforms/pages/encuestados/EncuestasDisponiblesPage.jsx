import React from 'react'
import { useSelector } from 'react-redux';
import { UfpsFormsLayout } from '../../layout/UfpsFormsLayout';

export const EncuestasDisponiblesPage = () => {
    const {poblacion} = useSelector(state => state.auth);


    return (
        <UfpsFormsLayout>
            <h1>EncuestasDisponiblesPage</h1>
            <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt enim maxime nostrum ex recusandae reprehenderit minus facere aperiam minima eos ipsum illo impedit nemo sunt quidem fuga, magni libero ea! Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, recusandae? Perspiciatis tempora error soluta non eum exercitationem, pariatur maiores cumque sint architecto doloremque fuga ullam corrupti labore iusto quos! Eius! Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet non dolore aliquid eos vero error quidem assumenda, quo sit ducimus inventore voluptatem debitis explicabo est modi, eveniet illum cupiditate eligendi!</div>
        </UfpsFormsLayout>
        
    )
}
