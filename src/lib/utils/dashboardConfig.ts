export const dashboardCards = [
    {
      title: "Total Events",
      key: "totalEvents",
      icon: "CalendarPlus",
      description: "Events you've created",
      formatter: (value: number) => value.toString(),
    },
    {
      title: "Total Participants",
      key: "totalParticipants",
      icon: "Users",
      description: "People joined your events",
      formatter: (value: number) => value.toString(),
    },
    {
      title: "Pending Invitations",
      key: "pendingInvitations",
      icon: "Mail",
      description: "Event invites awaiting response",
      formatter: (value: number) => value.toString(),
    },
    {
      title: "Total Reviews",
      key: "totalReviews",
      icon: "Star",
      description: "Feedback received",
      formatter: (value: number) => value.toString(),
    },
    {
      title: "Total Earnings",
      key: "totalEarnings",
      icon: "DollarSign",
      description: "Revenue from ticket sales",
      formatter: (value: number) => `$${value.toFixed(2)}`,
    },
  ];