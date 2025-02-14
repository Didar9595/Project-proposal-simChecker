import Project from "@/lib/models/projects.model";
import {connect} from '@/lib/mogodb/mongoose'

export const POST = async (req) => {
    try {
        await connect()
        const data = await req.json();
        console.log(data)
        const existingProject = await Project.findOne({
            $or: [{ dept: data.dept }],
        });

        if (existingProject) {
            return new Response(
                JSON.stringify({ message: "Projects already exists. Please remove previous one to add new project data." }),
                { status: 400 }
            );
        }


        const newProject = await Project.create({ projects: data.projects, uploadedBy: data.uploadedBy, dept:data.dept,threshold:data.threshold})
        await newProject.save()
        return new Response(JSON.stringify(newProject), { status: 200 })
    } catch (error) {
       
        return new Response(JSON.stringify({ message: "Error Uploading the Projects", error: error.message }), { status: 500 });
    }
}