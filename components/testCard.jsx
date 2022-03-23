/**
 * 
 * @prop {img} img - image of the user of testimonial
 * @prop {name} name - name of the user of testimonial
 * @prop {text} testimonial - testimonial of the user 
 * @returns renders a card with the data passed in the props 
 */


export default function TestCard({img, name, text}) {
    return (
        <div className="testcard">
       
                <img src={img} alt="testimonial" />
     
       
                <h1>{name}</h1>
                <p>{text}</p>
 
        </div>
    );

}