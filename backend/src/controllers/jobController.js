import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Create a new job
export const createJob = async (req, res) => {
  try {
    const {
      title,
      companyName,
      location,
      jobType,
      salaryFrom,
      salaryTo,
      description,
      requirements,
      responsibilities,
      applicationDeadline,
    } = req.body;

    const job = await prisma.job.create({
      data: {
        title,
        companyName,
        location,
        jobType,
        salaryFrom: parseInt(salaryFrom),
        salaryTo: parseInt(salaryTo),
        description,
        requirements,
        responsibilities,
        applicationDeadline: new Date(applicationDeadline),
      },
    });

    res.status(201).json(job);
  } catch (err) {
    console.error('Job creation failed', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Get all jobs with optional search filters
export const getAllJobs = async (req, res) => {
  try {
    const {
      title,
      location,
      jobType,
      salaryFrom,
      salaryTo
    } = req.query;

    const filters = {};

    if (title) {
      filters.title = {
        contains: title,
        mode: 'insensitive',
      };
    }

    if (location) {
      filters.location = {
        contains: location,
        mode: 'insensitive',
      };
    }

    if (jobType) {
      filters.jobType = jobType;
    }

    if (salaryFrom || salaryTo) {
      filters.AND = [];

      if (salaryFrom) {
        filters.AND.push({ salaryFrom: { gte: parseInt(salaryFrom) } });
      }
      if (salaryTo) {
        filters.AND.push({ salaryTo: { lte: parseInt(salaryTo) } });
      }
    }

    // ✅ Debug logs — paste these before the database call
    console.log('🔍 Incoming Query Params:', req.query);
    console.log('🛠️ Built Prisma Filters:', JSON.stringify(filters, null, 2));

    const jobs = await prisma.job.findMany({
      where: filters,
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.status(200).json(jobs);
  } catch (err) {
    console.error('Failed to fetch jobs', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
