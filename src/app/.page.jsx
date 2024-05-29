import React from "react";
import PageContainer from "@/app/components/container/PageContainer";

// components
// import Banner from '@/app/(DashboardLayout)/components/landingpage/banner/Banner';

import Footer from "@/app/components/layout/landing/footer/Footer";
import LpHeader from "@/app/components/layout/landing/header/Header";
import Banner from "@/app/components/layout/landing/banner/Banner";

export default function Landingpage() {
  return (
    <PageContainer title="Landingpage" description="this is Landingpage">
      <LpHeader />
      <Banner />

      <Footer />
    </PageContainer>
  );
}
