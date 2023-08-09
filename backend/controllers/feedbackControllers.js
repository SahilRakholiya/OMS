const feedbackModel=require('../models/feedback');
const userModel=require('../models/user');

exports.displayfeedback=async(req,resp)=>{
    try{

        const feedback_populate=await feedbackModel.find();
        if(feedback_populate=="")
        {
            let success= false
            return resp.status(400).send({success,message:"feedbacks not found"});
        }
        const all_feedback=feedback_populate.map(feedback=>({
            _id:feedback._id,
            user_name:feedback.user_name,
            topic:feedback.topic,
            description:feedback.description
        }))
        resp.status(200).send(all_feedback);

    }catch(err)
    {
        console.error(err);
        resp.status(500).send(err);
    }
}
exports.insertfeedback=async(req,resp)=>{
    try{
        const uid=req.params.id;
        const feedback=req.body;

        const u_id=await userModel.findOne({_id:uid});

        if(u_id==null)
        {
            console.log("User Name not found");
            let success = false
            return resp.status(400).send({success,message:"User Name not found"});        
        }

        const newfeedback=new feedbackModel({
            user_id:uid,
            user_name:u_id.name,
            topic:feedback.topic,
            description:feedback.description
        })
    
        result= await newfeedback.save();
        resp.status(200).send(result);


    }catch(err)
    {
        console.error(err);
        resp.status(500).send(err);
    }
}


// exports.updatefeedback=async (req,resp)=>{
//     try{
//         const feedback=req.params.email;

//         const feedback_search= await feedbackModel.findOne({email:feedback});

//         // const feedback=req.params;        
//         // const feedback_search=feedbackModel.findOne({email:feedback.email});

//         // or
//         // const feedback_search=feedbackModel.findOne({email:req.params.email});

        
//         if(!feedback_search)
//         {
//             return resp.status(400).send({message:"feedbacks not found"});   
//         }
//         feedbackModel.updateOne({_id:feedback_search._id},{
//             $set:{
//                 password:req.body.password
//             }
//         },(err,feedback_update)=>{
//             resp.status(500).send(feedback_update);
//         })

//     }catch(err)
//     {
//         console.error(err);
//         resp.status(500).send(err);
//     }
// }

exports.deletefeedback=async(req,resp)=>{
    try{

        let success=false;
        const feedback=await feedbackModel.findOne({_id:req.params.id});
        if(feedback==null)
        {
            return resp.status(400).send({success,message:"feedback not found"});
        }
        await feedbackModel.deleteOne({_id:req.params.id});
        if(feedback.deletedCount!=0)
        {
            success=true;
            return resp.status(200).send({success,sucmessage:`${feedback.topic} was deleted`});
        }
        resp.status(400).send({success,message:"feedbacks not found"});


    }catch(err)
    {
        console.error(err);
        resp.status(500).send(err);
    }
}



exports.searchfeedback=async(req,resp)=>{
    try{
        let success=true;
        const user_name=req.params.uname;
        const filter={user_name:new RegExp(user_name,'i')};
        
        const feedback= await feedbackModel.find(filter);

        if(feedback=="")
        {
            success=false;
            // resp.status(400).send({message:"feedbacks not found"});
            resp.status(400).send({success,message:"feedbacks not found"});
            return ;
        }
        
            resp.status(200).send(feedback);
        
    }catch(err)
    {
        console.error(err);
        resp.status(500).send(err);
    }
}
