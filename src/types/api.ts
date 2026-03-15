// Types imported from reddy-api-srm (latest)
export type {
  PasswordInput,
  AttendanceDetail,
  CourseDetail,
  MarkDetail,
  Mark,
  UserInfo,
  DaySchedule,
  CourseSlot,
  Month,
  Day,
  DayOrderResponse,
} from "reddy-api-srm";

// Re-export Day as DayInfo for backward compatibility
export type { Day as DayInfo } from "reddy-api-srm";

// Extended auth data to include concurrent session fields returned by the package
// (present at runtime but not in the published TypeScript types)
export interface ExtendedAuthData {
  cookies?: string;
  statusCode: number;
  message?: string;
  captcha?: {
    required: boolean;
    digest: string | null | undefined;
  };
  isConcurrentLimit?: boolean;
  flowId?: string | null;
}