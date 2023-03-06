import { SetMetadata } from '@nestjs/common';

// Define a constant string to represent the metadata key used to check
// whether or not a route is public
export const IS_PUBLIC_KEY = 'isPublic';

// Define a decorator function to set the isPublic metadata key to true
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);