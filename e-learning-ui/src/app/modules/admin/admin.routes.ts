import { Routes } from "@angular/router";
import { AdminDashboard } from "./admin-dashboard/admin-dashboard";
import { Users } from "./users/users";
import { Admin } from "./admin";
import { Courses } from "./courses/courses";
import { Crud } from "./crud";
import { CourseCategories } from "./course-categories/course-categories";
import { Chat } from "./chat/chat";
import { Lectures } from "./lectures/lectures";

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: Admin,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      { path: 'dashboard', component: AdminDashboard },
      { path: 'courses', component: Courses },
      { path: 'courses/lectures/:courseId', component: Lectures },
      { path: 'course-categories', component: CourseCategories },
      { path: 'crud', component: Crud },
      { path: 'users', component: Users },
      { path: 'chat', component: Chat },
    ],

  }
];
