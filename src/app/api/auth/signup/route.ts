import { NextResponse } from 'next/server';
import { db } from '@/config/database';
import { tenants, users, passwords } from '@/database/schemas';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const signUpSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = signUpSchema.parse(body);

    // Check if user already exists
    const existingUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, validatedData.email),
    });

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Create tenant (business account)
    // UUID will be generated automatically by PostgreSQL
    const tenantSlug = validatedData.email.split('@')[0].toLowerCase().replace(/[^a-z0-9-]/g, '-');

    const [tenant] = await db.insert(tenants).values({
      name: validatedData.name.split(' ')[0] + "'s Business", // Default business name
      slug: tenantSlug,
      subscriptionPlan: 'FREE',
      subscriptionStatus: 'TRIAL',
      settings: {
        businessName: validatedData.name.split(' ')[0] + "'s Business",
        businessEmail: validatedData.email,
        businessPhone: null,
        businessAddress: null,
        timezone: 'UTC',
        locale: 'en',
        branding: {
          logo: null,
          primaryColor: null,
          secondaryColor: null,
        },
        notifications: {
          defaultChannel: 'EMAIL',
          emailEnabled: true,
          smsEnabled: false,
          whatsappEnabled: false,
        },
      },
    }).returning({ id: tenants.id });

    // Create user account
    // UUID will be generated automatically by PostgreSQL
    const [user] = await db.insert(users).values({
      name: validatedData.name,
      email: validatedData.email,
      role: 'TENANT_ADMIN',
      tenantId: tenant.id,
    }).returning({ id: users.id });

    // Store hashed password
    await db.insert(passwords).values({
      userId: user.id,
      hash: hashedPassword,
    });

    return NextResponse.json({ message: 'Account created successfully' }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.errors[0].message }, { status: 400 });
    }

    console.error('Sign up error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

