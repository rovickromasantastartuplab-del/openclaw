# Ribo_Staging — Scan Report

> Scanned: 2026-04-02 10:08:52 UTC
> Target: `/tmp/Ribo_Staging`

---

## Project Overview

| Field | Value |
|---|---|
| Name | laravel/react-starter-kit |
| Type | Laravel/PHP |
| Description | The skeleton application for the Laravel framework. |
| Stack | CSS, HTML, JSON, JSX, JavaScript, Markdown, PHP, SCSS, TSX, TypeScript, YAML · Inertia.js, Laravel, Vite · Runtime: Node.js, PHP, React |

## Directory Structure

```
.
├── app
│   ├── Console
│   │   ├── Commands
│   │   │   ├── AssignDefaultPlanToUsers.php
│   │   │   ├── ProcessFollowUps.php
│   │   │   └── RenewGmailWatch.php
│   │   └── Kernel.php
│   ├── Events
│   │   ├── AccountCreate.php
│   │   ├── CaseCreated.php
│   │   ├── GmailSyncCompleted.php
│   │   ├── InvoiceCreated.php
│   │   ├── InvoiceStatusChanged.php
│   │   ├── LeadAssigned.php
│   │   ├── LeadStatusChanged.php
│   │   ├── MeetingInvitation.php
│   │   ├── OpportunityCreated.php
│   │   ├── OpportunityStageChanged.php
│   │   ├── QuoteCreated.php
│   │   ├── QuoteStatusChanged.php
│   │   ├── SalesOrderCreated.php
│   │   ├── SalesOrderStatusChanged.php
│   │   ├── TaskAssigned.php
│   │   └── UserCreated.php
│   ├── Exports
│   │   ├── InvoiceExport.php
│   │   ├── LeadExport.php
│   │   ├── ProductExport.php
│   │   ├── ProjectExport.php
│   │   ├── ProjectTaskExport.php
│   │   ├── QuoteExport.php
│   │   ├── SalesOrderExport.php
│   │   └── WeddingSupplierExport.php
│   ├── Helpers
│   │   ├── AssetHelper.php
│   │   └── helper.php
│   ├── Http
│   │   ├── Controllers
│   │   │   ├── Auth
│   │   │   │   ├── AuthenticatedSessionController.php
│   │   │   │   ├── ConfirmablePasswordController.php
│   │   │   │   ├── EmailVerificationNotificationController.php
│   │   │   │   ├── EmailVerificationPromptController.php
│   │   │   │   ├── NewPasswordController.php
│   │   │   │   ├── PasswordResetLinkController.php
│   │   │   │   ├── RegisteredUserController.php
│   │   │   │   └── VerifyEmailController.php
│   │   │   ├── LandingPage
│   │   │   │   └── CustomPageController.php
│   │   │   ├── Settings
│   │   │   │   ├── CompanyPaymentSettingController.php
│   │   │   │   ├── CompanySystemSettingsController.php
│   │   │   │   ├── CurrencySettingController.php
│   │   │   │   ├── EmailSettingController.php
│   │   │   │   ├── IntegrationsSettingsController.php
│   │   │   │   ├── PasswordController.php
│   │   │   │   ├── PaymentSettingController.php
│   │   │   │   ├── ProfileController.php
│   │   │   │   ├── SettingsController.php
│   │   │   │   ├── SocialAuthController.php
│   │   │   │   ├── SystemSettingsController.php
│   │   │   │   └── WebhookController.php
│   │   │   ├── Webhooks
│   │   │   │   ├── FacebookWebhookController.php
│   │   │   │   ├── WhatsAppWebhookController.php
│   │   │   │   └── WordPressWebhookController.php
│   │   │   ├── AamarpayPaymentController.php
│   │   │   ├── AccountCommentController.php
│   │   │   ├── AccountController.php
│   │   │   ├── AccountIndustryController.php
│   │   │   ├── AccountTypeController.php
│   │   │   ├── AuthorizeNetPaymentController.php
│   │   │   ├── BankPaymentController.php
│   │   │   ├── BaseController.php
│   │   │   ├── BenefitPaymentController.php
│   │   │   ├── BrandController.php
│   │   │   ├── CalendarController.php
│   │   │   ├── CallController.php
│   │   │   ├── CampaignController.php
│   │   │   ├── CampaignTypeController.php
│   │   │   ├── CaseController.php
│   │   │   ├── CashfreeController.php
│   │   │   ├── CategoryController.php
│   │   │   ├── ChatGptController.php
│   │   │   ├── CinetPayPaymentController.php
│   │   │   ├── CoinGatePaymentController.php
│   │   │   ├── CompanyController.php
│   │   │   ├── ContactController.php
│   │   │   ├── ContactMessageController.php
│   │   │   ├── Controller.php
│   │   │   ├── ConversationController.php
│   │   │   ├── CookieConsentController.php
│   │   │   ├── CouponController.php
│   │   │   ├── CurrencyController.php
│   │   │   ├── DashboardController.php
│   │   │   ├── DeliveryOrderController.php
│   │   │   ├── DocumentController.php
│   │   │   ├── DocumentFolderController.php
│   │   │   ├── DocumentTypeController.php
│   │   │   ├── EasebuzzPaymentController.php
│   │   │   ├── EmailTemplateController.php
│   │   │   ├── FedaPayPaymentController.php
│   │   │   ├── FlutterwavePaymentController.php
│   │   │   ├── GmailController.php
│   │   │   ├── GmailWebhookController.php
│   │   │   ├── GoogleCalendarController.php
│   │   │   ├── HitPayPaymentController.php
│   │   │   ├── ImpersonateController.php
│   │   │   ├── InvitationController.php
│   │   │   ├── InvoiceAamarpayPaymentController.php
│   │   │   ├── InvoiceAuthorizeNetPaymentController.php
│   │   │   ├── InvoiceBankPaymentController.php
│   │   │   ├── InvoiceBenefitPaymentController.php
│   │   │   ├── InvoiceCashfreePaymentController.php
│   │   │   ├── InvoiceCinetPayPaymentController.php
│   │   │   ├── InvoiceCoingatePaymentController.php
│   │   │   ├── InvoiceCommentController.php
│   │   │   ├── InvoiceController.php
│   │   │   ├── InvoiceEasebuzzPaymentController.php
│   │   │   ├── InvoiceFedaPayPaymentController.php
│   │   │   ├── InvoiceFlutterwavePaymentController.php
│   │   │   ├── InvoiceHitpayPaymentController.php
│   │   │   ├── InvoiceIyzipayPaymentController.php
│   │   │   ├── InvoiceKhaltiPaymentController.php
│   │   │   ├── InvoiceMercadoPagoPaymentController.php
│   │   │   ├── InvoiceMidtransPaymentController.php
│   │   │   ├── InvoiceMolliePaymentController.php
│   │   │   ├── InvoiceOzowPaymentController.php
│   │   │   ├── InvoicePaiementPaymentController.php
│   │   │   ├── InvoicePayfastPaymentController.php
│   │   │   ├── InvoicePayHerePaymentController.php
│   │   │   ├── InvoicePaymentWallPaymentController.php
│   │   │   ├── InvoicePayPalPaymentController.php
│   │   │   ├── InvoicePaystackPaymentController.php
│   │   │   ├── InvoicePayTabsPaymentController.php
│   │   │   ├── InvoicePayTRPaymentController.php
│   │   │   ├── InvoiceRazorpayPaymentController.php
│   │   │   ├── InvoiceSkrillPaymentController.php
│   │   │   ├── InvoiceSSPayPaymentController.php
│   │   │   ├── InvoiceStripePaymentController.php
│   │   │   ├── InvoiceTapPaymentController.php
│   │   │   ├── InvoiceToyyibPayPaymentController.php
│   │   │   ├── InvoiceXenditPaymentController.php
│   │   │   ├── InvoiceYooKassaPaymentController.php
│   │   │   ├── IyzipayPaymentController.php
│   │   │   ├── KhaltiPaymentController.php
│   │   │   ├── LandingPageController.php
│   │   │   ├── LanguageController.php
│   │   │   ├── LeadCommentController.php
│   │   │   ├── LeadController.php
│   │   │   ├── LeadSourceController.php
│   │   │   ├── LeadStatusController.php
│   │   │   ├── MediaController.php
│   │   │   ├── MeetingController.php
│   │   │   ├── MercadoPagoController.php
│   │   │   ├── MidtransPaymentController.php
│   │   │   ├── MolliePaymentController.php
│   │   │   ├── NepalstePaymentController.php
│   │   │   ├── NewsletterController.php
│   │   │   ├── NotificationTemplateController.php
│   │   │   ├── OnboardingController.php
│   │   │   ├── OpportunityCommentController.php
│   │   │   ├── OpportunityController.php
│   │   │   ├── OpportunitySourceController.php
│   │   │   ├── OpportunityStageController.php
│   │   │   ├── OzowPaymentController.php
│   │   │   ├── PaiementPaymentController.php
│   │   │   ├── PayfastPaymentController.php
│   │   │   ├── PayHerePaymentController.php
│   │   │   ├── PaymentWallPaymentController.php
│   │   │   ├── PayPalPaymentController.php
│   │   │   ├── PaystackPaymentController.php
│   │   │   ├── PayTabsPaymentController.php
│   │   │   ├── PayTRPaymentController.php
│   │   │   ├── PermissionController.php
│   │   │   ├── PlanController.php
│   │   │   ├── PlanOrderController.php
│   │   │   ├── PlanRequestController.php
│   │   │   ├── ProductController.php
│   │   │   ├── ProjectController.php
│   │   │   ├── ProjectTaskController.php
│   │   │   ├── PurchaseOrderCommentController.php
│   │   │   ├── PurchaseOrderController.php
│   │   │   ├── QuoteCommentController.php
│   │   │   ├── QuoteController.php
│   │   │   ├── RazorpayController.php
│   │   │   ├── ReceiptOrderController.php
│   │   │   ├── ReferralController.php
│   │   │   ├── ReportsController.php
│   │   │   ├── ReturnOrderController.php
│   │   │   ├── RoleController.php
│   │   │   ├── SalesOrderCommentController.php
│   │   │   ├── SalesOrderController.php
│   │   │   ├── ShippingProviderTypeController.php
│   │   │   ├── SkrillPaymentController.php
│   │   │   ├── SSPayPaymentController.php
│   │   │   ├── StripePaymentController.php
│   │   │   ├── TapPaymentController.php
│   │   │   ├── TargetListController.php
│   │   │   ├── TaskStatusController.php
│   │   │   ├── TaxController.php
│   │   │   ├── ToyyibPayPaymentController.php
│   │   │   ├── TranslationController.php
│   │   │   ├── UserController.php
│   │   │   ├── WeddingSupplierCategoryController.php
│   │   │   ├── WeddingSupplierController.php
│   │   │   ├── XenditPaymentController.php
│   │   │   └── YooKassaPaymentController.php
│   │   ├── Middleware
│   │   │   ├── CheckInstallation.php
│   │   │   ├── CheckLandingPageEnabled.php
│   │   │   ├── CheckPermission.php
│   │   │   ├── CheckPlanAccess.php
│   │   │   ├── CheckPlanFeature.php
│   │   │   ├── DemoModeMiddleware.php
│   │   │   ├── EnsureEmailIsVerified.php
│   │   │   ├── EnsureOnboardingCompleted.php
│   │   │   ├── HandleAppearance.php
│   │   │   ├── HandleInertiaRequests.php
│   │   │   ├── ShareGlobalSettings.php
│   │   │   ├── SuperAdminMiddleware.php
│   │   │   └── VerifyCsrfToken.php
│   │   └── Requests
│   │       ├── Auth
│   │       │   └── LoginRequest.php
│   │       ├── Settings
│   │       │   └── ProfileUpdateRequest.php
│   │       ├── CategoryRequest.php
│   │       ├── CouponRequest.php
│   │       ├── PermissionRequest.php
│   │       ├── ProductFormRequest.php
│   │       ├── RoleRequest.php
│   │       └── UserRequest.php
│   ├── Imports
│   │   ├── LeadImport.php
│   │   ├── ProductImport.php
│   │   └── WeddingSupplierImport.php
│   ├── Jobs
│   │   ├── ClassifyLeadIntentJob.php
│   │   └── SyncGmailThreadsJob.php
│   ├── Libraries
│   │   ├── Coingate
│   │   │   └── Coingate.php
│   │   ├── Easebuzz
│   │   │   ├── easebuzz_payment_gateway.php
│   │   │   ├── payment.php
│   │   │   ├── payout.php
│   │   │   ├── refund.php
│   │   │   ├── transaction_date.php
│   │   │   └── transaction.php
│   │   └── Tap
│   │       ├── Payment.php
│   │       ├── Reference.php
│   │       ├── Tap.php
│   │       └── TapServiceProvider.php
│   ├── Listeners
│   │   ├── SendAssignLeadEmail.php
│   │   ├── SendCaseCreatedEmail.php
│   │   ├── SendInvoiceCreatedEmail.php
│   │   ├── SendInvoiceStatusChangedEmail.php
│   │   ├── SendLeadStatusChangedEmail.php
│   │   ├── SendLeadStatusChangedToLeadEmail.php
│   │   ├── SendLeadWelcomeEmail.php
│   │   ├── SendMeetingInvitationEmail.php
│   │   ├── SendOpportunityCreatedEmail.php
│   │   ├── SendOpportunityStageChangedEmail.php
│   │   ├── SendQuoteCreatedEmail.php
│   │   ├── SendQuoteStatusChangedEmail.php
│   │   ├── SendSalesOrderCreatedEmail.php
│   │   ├── SendSalesOrderStatusChangedEmail.php
│   │   ├── SendTaskAssignedEmail.php
│   │   ├── SendUserCreatedEmail.php
│   │   ├── TwilioAccountCreateListener.php
│   │   ├── TwilioCaseCreateListener.php
│   │   ├── TwilioLeadCreateListener.php
│   │   ├── TwilioMettingCreateListener.php
│   │   ├── TwilioOpportunityCreateListener.php
│   │   ├── TwilioQuoteCreateListener.php
│   │   ├── WebhookAssignLeadListener.php
│   │   ├── WebhookCaseCreateListener.php
│   │   ├── WebhookMeetingInvitationListener.php
│   │   ├── WebhookOpportunityCreateListener.php
│   │   ├── WebhookQuoteCreateListener.php
│   │   ├── WebhookTaskCreateListener.php
│   │   └── WebhookUserCreateListener.php
│   ├── Mail
│   │   ├── EmailTemplate.php
│   │   ├── ErrorOccurred.php
│   │   ├── TeamInvitationMail.php
│   │   └── TestMail.php
│   ├── Models
│   │   ├── Account.php
│   │   ├── AccountActivity.php
│   │   ├── AccountComment.php
│   │   ├── AccountIndustry.php
│   │   ├── AccountType.php
│   │   ├── AiClassificationResult.php
│   │   ├── BaseAuthenticatable.php
│   │   ├── BaseModel.php
│   │   ├── BaseSpatiePermission.php
│   │   ├── BaseSpatieRole.php
│   │   ├── Brand.php
│   │   ├── Call.php
│   │   ├── CallAttendee.php
│   │   ├── Campaign.php
│   │   ├── CampaignType.php
│   │   ├── CaseModel.php
│   │   ├── Category.php
│   │   ├── CompanyFeatureFlag.php
│   │   ├── Contact.php
│   │   ├── ContactMessage.php
│   │   ├── Coupon.php
│   │   ├── Currency.php
│   │   ├── DeliveryOrder.php
│   │   ├── Document.php
│   │   ├── DocumentFolder.php
│   │   ├── DocumentType.php
│   │   ├── EmailMessage.php
│   │   ├── EmailTemplate.php
│   │   ├── EmailTemplateLang.php
│   │   ├── EmailThread.php
│   │   ├── FieldMapping.php
│   │   ├── GmailAccount.php
│   │   ├── GmailAccountActivity.php
│   │   ├── HitpayWebhookLog.php
│   │   ├── Invoice.php
│   │   ├── InvoiceActivity.php
│   │   ├── InvoiceComment.php
│   │   ├── InvoicePayment.php
│   │   ├── LandingPageCustomPage.php
│   │   ├── LandingPageSetting.php
│   │   ├── Lead.php
│   │   ├── LeadActivity.php
│   │   ├── LeadComment.php
│   │   ├── LeadEvent.php
│   │   ├── LeadSource.php
│   │   ├── LeadStatus.php
│   │   ├── LoginHistory.php
│   │   ├── MediaItem.php
│   │   ├── Meeting.php
│   │   ├── MeetingAttendee.php
│   │   ├── Newsletter.php
│   │   ├── NotificationTemplate.php
│   │   ├── NotificationTemplateLang.php
│   │   ├── Opportunity.php
│   │   ├── OpportunityActivity.php
│   │   ├── OpportunityComment.php
│   │   ├── OpportunitySource.php
│   │   ├── OpportunityStage.php
│   │   ├── PaymentSetting.php
│   │   ├── PayoutRequest.php
│   │   ├── Permission.php
│   │   ├── Plan.php
│   │   ├── PlanCurrencyPrice.php
│   │   ├── PlanOrder.php
│   │   ├── PlanRequest.php
│   │   ├── Product.php
│   │   ├── Project.php
│   │   ├── ProjectTask.php
│   │   ├── PurchaseOrder.php
│   │   ├── PurchaseOrderActivity.php
│   │   ├── PurchaseOrderComment.php
│   │   ├── Quote.php
│   │   ├── QuoteActivity.php
│   │   ├── QuoteComment.php
│   │   ├── ReceiptOrder.php
│   │   ├── Referral.php
│   │   ├── ReferralSetting.php
│   │   ├── ReturnOrder.php
│   │   ├── Role.php
│   │   ├── SalesOrder.php
│   │   ├── SalesOrderActivity.php
│   │   ├── Setting.php
│   │   ├── ShippingProviderType.php
│   │   ├── SocialAccount.php
│   │   ├── TargetList.php
│   │   ├── TaskStatus.php
│   │   ├── Tax.php
│   │   ├── User.php
│   │   ├── UserEmailTemplate.php
│   │   ├── UserNotificationTemplate.php
│   │   ├── UserPaymentMethod.php
│   │   ├── Webhook.php
│   │   ├── WeddingSupplier.php
│   │   ├── WeddingSupplierCategory.php
│   │   └── WeddingSupplierContact.php
│   ├── Notifications
│   │   └── ConversationFollowUp.php
│   ├── Observers
│   │   ├── AccountObserver.php
│   │   ├── InvoiceObserver.php
│   │   ├── LeadObserver.php
│   │   ├── OpportunityObserver.php
│   │   ├── PlanObserver.php
│   │   ├── PurchaseOrderObserver.php
│   │   ├── QuoteObserver.php
│   │   ├── SalesOrderObserver.php
│   │   └── UserObserver.php
│   ├── PathGenerators
│   │   └── MediaPathGenerator.php
│   ├── Policies
│   │   ├── WeddingSupplierCategoryPolicy.php
│   │   └── WeddingSupplierPolicy.php
│   ├── Providers
│   │   ├── AppServiceProvider.php
│   │   ├── AssetServiceProvider.php
│   │   └── EventServiceProvider.php
│   ├── Services
│   │   ├── Omnichannel
│   │   │   ├── ContactMatcherService.php
│   │   │   ├── FacebookLeadAdsService.php
│   │   │   └── LeadEventTrackerService.php
│   │   ├── DynamicStorageService.php
│   │   ├── EmailTemplateService.php
│   │   ├── GmailService.php
│   │   ├── GoogleCalendarService.php
│   │   ├── InvoicePaymentService.php
│   │   ├── MailConfigService.php
│   │   ├── PlanPricingService.php
│   │   ├── StorageConfigService.php
│   │   ├── TwilioService.php
│   │   ├── UserService.php
│   │   └── WebhookService.php
│   └── Traits
│       └── AutoApplyPermissionCheck.php
├── bootstrap
│   ├── cache
│   │   └── .gitignore
│   ├── app.php
│   └── providers.php
├── config
│   ├── app.php
│   ├── auth.php
│   ├── broadcasting.php
│   ├── cache.php
│   ├── database.php
│   ├── dateformat.php
│   ├── error_log
│   ├── filesystems.php
│   ├── inertia.php
│   ├── installer.php
│   ├── larabug.php
│   ├── laravel-impersonate.php
│   ├── logging.php
│   ├── mail.php
│   ├── media-library.php
│   ├── openai.php
│   ├── paytabs.php
│   ├── permission.php
│   ├── queue.php
│   ├── role-permissions.php
│   ├── services.php
│   ├── session.php
│   ├── timeformat.php
│   ├── timezones.php
│   └── verification.php
├── database
│   ├── factories
│   │   ├── AccountFactory.php
│   │   ├── CaseFactory.php
│   │   ├── CategoryFactory.php
│   │   ├── ProductFactory.php
│   │   ├── ProjectFactory.php
│   │   └── UserFactory.php
│   ├── migrations
│   │   ├── 0001_01_01_000000_create_users_table.php
│   │   ├── 0001_01_01_000001_create_cache_table.php
│   │   ├── 0001_01_01_000002_create_jobs_table.php
│   │   ├── 2025_01_27_084150_create_landing_page_settings_table.php
│   │   ├── 2025_01_28_000001_create_webhooks_table.php
│   │   ├── 2025_01_29_000001_create_taxes_table.php
│   │   ├── 2025_01_29_000002_create_brands_table.php
│   │   ├── 2025_01_29_000003_create_account_types_table.php
│   │   ├── 2025_01_29_000003_create_categories_table.php
│   │   ├── 2025_01_29_000004_create_account_industries_table.php
│   │   ├── 2025_01_29_000004_create_products_table.php
│   │   ├── 2025_01_29_000005_create_accounts_table.php
│   │   ├── 2025_01_29_000006_create_contacts_table.php
│   │   ├── 2025_01_29_000007_create_lead_statuses_table.php
│   │   ├── 2025_01_29_000008_create_lead_sources_table.php
│   │   ├── 2025_01_29_000010_create_opportunity_stages_table.php
│   │   ├── 2025_01_29_000011_create_campaign_types_table.php
│   │   ├── 2025_01_29_000011_create_opportunity_sources_table.php
│   │   ├── 2025_01_29_000012_create_opportunities_table.php
│   │   ├── 2025_01_29_000012_create_target_lists_table.php
│   │   ├── 2025_01_29_000013_create_campaigns_table.php
│   │   ├── 2025_01_29_000013_create_opportunity_products_table.php
│   │   ├── 2025_01_29_000014_create_leads_table.php
│   │   ├── 2025_01_29_000015_create_cases_table.php
│   │   ├── 2025_01_29_000016_create_shipping_provider_types_table.php
│   │   ├── 2025_01_29_000020_create_projects_table.php
│   │   ├── 2025_01_29_000020_create_task_statuses_table.php
│   │   ├── 2025_01_29_000021_create_project_tasks_table.php
│   │   ├── 2025_01_29_000030_create_document_folders_table.php
│   │   ├── 2025_01_29_000031_create_document_types_table.php
│   │   ├── 2025_01_29_000032_create_documents_table.php
│   │   ├── 2025_01_30_000001_create_meetings_table.php
│   │   ├── 2025_01_30_000001_create_notification_templates_table.php
│   │   ├── 2025_01_30_000001_create_quotes_table.php
│   │   ├── 2025_01_30_000001_create_sales_orders_table.php
│   │   ├── 2025_01_30_000002_create_meeting_attendees_table.php
│   │   ├── 2025_01_30_000002_create_notification_template_langs_table.php
│   │   ├── 2025_01_30_000002_create_quote_products_table.php
│   │   ├── 2025_01_30_000002_create_sales_order_products_table.php
│   │   ├── 2025_01_30_000002_create_user_notification_templates_table.php
│   │   ├── 2025_01_30_000003_create_calls_table.php
│   │   ├── 2025_01_30_000003_create_invoices_table.php
│   │   ├── 2025_01_30_000004_create_call_attendees_table.php
│   │   ├── 2025_01_30_000004_create_invoice_products_table.php
│   │   ├── 2025_01_30_000005_create_invoice_activities_table.php
│   │   ├── 2025_01_30_000006_create_invoice_comments_table.php
│   │   ├── 2025_01_30_120000_create_return_orders_table.php
│   │   ├── 2025_01_30_120001_create_return_order_product_table.php
│   │   ├── 2025_01_31_000001_create_delivery_orders_table.php
│   │   ├── 2025_01_31_000002_create_delivery_order_products_table.php
│   │   ├── 2025_01_31_000010_create_purchase_orders_table.php
│   │   ├── 2025_01_31_000011_create_purchase_order_products_table.php
│   │   ├── 2025_01_31_000012_create_purchase_order_activities_table.php
│   │   ├── 2025_01_31_000013_create_purchase_order_comments_table.php
│   │   ├── 2025_01_31_000020_create_receipt_orders_table.php
│   │   ├── 2025_01_31_000021_create_receipt_order_products_table.php
│   │   ├── 2025_05_25_000000_create_permission_tables.php
│   │   ├── 2025_06_18_000001_create_plans_table.php
│   │   ├── 2025_06_18_105755_create_settings_table.php
│   │   ├── 2025_06_19_051735_create_coupons_table.php
│   │   ├── 2025_06_19_084856_create_plan_requests_table.php
│   │   ├── 2025_06_19_085023_create_plan_orders_table.php
│   │   ├── 2025_06_20_000001_add_onboarding_fields_to_users.php
│   │   ├── 2025_06_20_044143_create_referral_settings_table.php
│   │   ├── 2025_06_20_044158_create_referrals_table.php
│   │   ├── 2025_06_20_044206_create_payout_requests_table.php
│   │   ├── 2025_06_24_044208_create_currencies_table.php
│   │   ├── 2025_06_26_100501_create_payment_settings_table.php
│   │   ├── 2025_06_27_053245_create_media_table.php
│   │   ├── 2025_06_27_060535_create_media_items_table.php
│   │   ├── 2025_06_27_115807_create_email_templates_table.php
│   │   ├── 2025_06_27_115820_create_email_template_langs_table.php
│   │   ├── 2025_06_27_115828_create_user_email_templates_table.php
│   │   ├── 2025_07_02_094334_create_landing_page_custom_pages_table.php
│   │   ├── 2025_08_08_085111_create_lead_activities_table.php
│   │   ├── 2025_08_08_115553_create_lead_comments_table.php
│   │   ├── 2025_08_11_090404_create_quote_activities_table.php
│   │   ├── 2025_08_11_090819_create_quote_comments_table.php
│   │   ├── 2025_08_11_092346_create_sales_order_activities_table.php
│   │   ├── 2025_08_11_111152_create_account_activities_table.php
│   │   ├── 2025_08_11_111510_create_account_comments_table.php
│   │   ├── 2025_08_11_115519_create_opportunity_activities_table.php
│   │   ├── 2025_08_11_115538_create_opportunity_comments_table.php
│   │   ├── 2025_08_12_111557_create_invoice_payments_table.php
│   │   ├── 2025_09_25_063335_create_contact_messages_table.php
│   │   ├── 2025_09_25_090314_create_newsletters_table.php
│   │   ├── 2025_10_06_083830_create_login_histories_table.php
│   │   ├── 2025_12_16_000001_add_google_calendar_event_id_to_meetings_and_calls.php
│   │   ├── 2025_12_17_000001_add_google_calendar_event_id_to_project_tasks.php
│   │   ├── 2026_02_17_150954_create_wedding_supplier_tables.php
│   │   ├── 2026_02_20_053307_add_invitation_fields_to_users_table.php
│   │   ├── 2026_02_22_000001_create_plan_currency_prices_table.php
│   │   ├── 2026_02_22_095755_create_hitpay_webhook_logs_table.php
│   │   ├── 2026_02_22_233944_add_hide_plan_modal_to_users_table.php
│   │   ├── 2026_02_25_000001_create_user_payment_methods_table.php
│   │   ├── 2026_02_26_024621_increase_type_column_length_in_users_table.php
│   │   ├── 2026_02_27_122539_add_stock_deducted_to_invoices_table.php
│   │   ├── 2026_03_03_000001_add_currency_code_to_plan_orders_table.php
│   │   ├── 2026_03_04_230716_add_social_fields_to_contacts_table.php
│   │   ├── 2026_03_04_230720_create_lead_events_table.php
│   │   ├── 2026_03_04_230722_create_ai_classification_results_table.php
│   │   ├── 2026_03_04_230737_add_ai_fields_to_leads_table.php
│   │   ├── 2026_03_06_023747_create_social_accounts_table.php
│   │   ├── 2026_03_06_063000_create_field_mappings_table.php
│   │   ├── 2026_03_11_135235_add_order_to_lead_statuses_and_opportunity_stages.php
│   │   ├── 2026_03_17_000001_create_gmail_accounts_table.php
│   │   ├── 2026_03_17_000002_create_email_threads_table.php
│   │   ├── 2026_03_17_000003_create_email_messages_table.php
│   │   ├── 2026_03_18_053319_create_email_threadables_table.php
│   │   ├── 2026_03_18_120000_add_message_id_to_email_messages_table.php
│   │   ├── 2026_03_19_031447_grant_manage_conversations_to_company_roles.php
│   │   ├── 2026_03_20_101946_create_gmail_account_activities_table.php
│   │   ├── 2026_03_20_141739_add_indexes_to_email_messages_table.php
│   │   ├── 2026_03_21_140000_add_next_page_token_to_gmail_accounts_table.php
│   │   ├── 2026_03_21_170000_add_compliance_fields_to_email_threads_table.php
│   │   ├── 2026_03_21_170001_create_email_thread_assignments_table.php
│   │   ├── 2026_03_21_191030_add_gmail_sync_categories_to_gmail_accounts_table.php
│   │   ├── 2026_03_23_000001_add_user_id_to_email_messages_table.php
│   │   └── 2026_03_24_092952_add_bcc_emails_to_email_messages_table.php
│   ├── seeders
│   │   ├── AccountIndustrySeeder.php
│   │   ├── AccountSeeder.php
│   │   ├── AccountTypeSeeder.php
│   │   ├── BrandSeeder.php
│   │   ├── CallSeeder.php
│   │   ├── CampaignSeeder.php
│   │   ├── CampaignTypeSeeder.php
│   │   ├── CaseSeeder.php
│   │   ├── CategorySeeder.php
│   │   ├── CompanySeeder.php
│   │   ├── ContactMessageSeeder.php
│   │   ├── ContactSeeder.php
│   │   ├── CouponSeeder.php
│   │   ├── CurrencySeeder.php
│   │   ├── DatabaseSeeder.php
│   │   ├── DeliveryOrderSeeder.php
│   │   ├── DocumentFolderSeeder.php
│   │   ├── DocumentSeeder.php
│   │   ├── DocumentTypeSeeder.php
│   │   ├── EmailTemplateSeeder.php
│   │   ├── error_log
│   │   ├── FollowUpEmailTemplateSeeder.php
│   │   ├── InvoiceSeeder.php
│   │   ├── LandingPageCustomPageSeeder.php
│   │   ├── LeadActivitySeeder.php
│   │   ├── LeadSeeder.php
│   │   ├── LeadSourceSeeder.php
│   │   ├── LeadStatusSeeder.php
│   │   ├── LoginHistorySeeder.php
│   │   ├── MediaItemSeeder.php
│   │   ├── MeetingSeeder.php
│   │   ├── NewsletterSeeder.php
│   │   ├── NotificationTemplateSeeder.php
│   │   ├── OpportunitySeeder.php
│   │   ├── OpportunitySourceSeeder.php
│   │   ├── OpportunityStageSeeder.php
│   │   ├── PayoutRequestSeeder.php
│   │   ├── PermissionSeeder.php
│   │   ├── PlanOrderSeeder.php
│   │   ├── PlanRequestSeeder.php
│   │   ├── PlanSeeder.php
│   │   ├── ProductSeeder.php
│   │   ├── ProjectSeeder.php
│   │   ├── ProjectTaskSeeder.php
│   │   ├── PurchaseOrderSeeder.php
│   │   ├── QuoteSeeder.php
│   │   ├── ReceiptOrderSeeder.php
│   │   ├── ReferralProgramSeeder.php
│   │   ├── ReferralSeeder.php
│   │   ├── ReferralSettingSeeder.php
│   │   ├── ReturnOrderSeeder.php
│   │   ├── RoleSeeder.php
│   │   ├── SalesOrderSeeder.php
│   │   ├── SarahJohnsonDataSeeder.php
│   │   ├── ShippingProviderTypeSeeder.php
│   │   ├── StaffRoleSeeder.php
│   │   ├── TargetListSeeder.php
│   │   ├── TaskStatusSeeder.php
│   │   ├── TaxSeeder.php
│   │   ├── UserSeeder.php
│   │   ├── WebhookSeeder.php
│   │   └── WeddingSupplierCategorySeeder.php
│   └── .gitignore
├── docs
│   ├── testcase_exports
│   │   ├── Ribo_Testcases_DASHBOARD.csv
│   │   ├── Ribo_Testcases_Sheet4.csv
│   │   ├── Ribo_Testcases_Test_Case___Sprint_1.csv
│   │   ├── Ribo_Testcases_Test_Case___Sprint_2_0.csv
│   │   ├── Ribo_Testcases_Test_Case___Sprint_2.csv
│   │   ├── Ribo_Testcases_Test_Case___Sprint_3.csv
│   │   ├── Ribo_Testcases_Test_Data_Copy.csv
│   │   └── Ribo_Testcases_Test_Data.csv
│   ├── Founder Direction Document - Conversation Modules (V1.0).md
│   ├── generated_leads.xlsx
│   ├── gmail errors
│   ├── gmail_crm_feature_overview.pdf
│   ├── gmail_crm_feature_overview.txt
│   ├── HitPay_and_MultiCurrency_Integration.md
│   ├── hitpay_save_payment_method_plan.md
│   ├── hitpay-integration.md
│   ├── oauth_webhook_routing_flow.md
│   ├── omnichannel_implementation_summary.md
│   ├── Ribo Testcases.xlsx
│   ├── Ribo_Testcases.csv
│   ├── Sales_Flow
│   ├── sample-lead (7).xlsx
│   ├── Social Media connection - RIBO.pdf
│   └── social_media_parsed.txt
├── help
│   ├── app
│   │   ├── Attributes
│   │   │   ├── Controllers
│   │   │   │   ├── AttributesController.php
│   │   │   │   └── AttributesListController.php
│   │   │   ├── Models
│   │   │   │   └── CustomAttribute.php
│   │   │   ├── Policies
│   │   │   │   └── AttributePolicy.php
│   │   │   ├── Traits
│   │   │   │   └── HasCustomAttributes.php
│   │   │   └── AttributeFilters.php
│   │   ├── CannedReplies
│   │   │   ├── Actions
│   │   │   │   └── BuildCannedRepliesList.php
│   │   │   ├── Controllers
│   │   │   │   └── CannedRepliesController.php
│   │   │   ├── Models
│   │   │   │   └── CannedReply.php
│   │   │   └── Policies
│   │   │       └── CannedReplyPolicy.php
│   │   ├── Contacts
│   │   │   ├── Actions
│   │   │   │   ├── LoadCustomerProfile.php
│   │   │   │   └── PaginateCustomers.php
│   │   │   ├── Controllers
│   │   │   │   ├── CustomerProfileController.php
│   │   │   │   ├── CustomersController.php
│   │   │   │   └── MergeCustomersController.php
│   │   │   ├── Events
│   │   │   │   └── HelpDeskUserCreated.php
│   │   │   ├── Models
│   │   │   │   ├── Email.php
│   │   │   │   ├── PageVisit.php
│   │   │   │   └── UserDetails.php
│   │   │   └── Traits
│   │   │       └── CanHaveSecondaryEmails.php
│   │   ├── Conversations
│   │   │   ├── Actions
│   │   │   │   ├── ConversationEventsCreator.php
│   │   │   │   ├── ConversationListBuilder.php
│   │   │   │   └── PaginateConversationItems.php
│   │   │   ├── Agent
│   │   │   │   ├── Actions
│   │   │   │   │   ├── AssignConversationsToGroup.php
│   │   │   │   │   ├── ConversationListLoader.php
│   │   │   │   │   ├── ConversationsAssigner.php
│   │   │   │   │   ├── CreateConversationAsAgent.php
│   │   │   │   │   ├── DeleteMultipleConversations.php
│   │   │   │   │   ├── FullConversationLoader.php
│   │   │   │   │   ├── InboxViewsLoader.php
│   │   │   │   │   ├── MergeConversations.php
│   │   │   │   │   ├── SendTicketReplyEmail.php
│   │   │   │   │   └── SubmitMessageAsAgent.php
│   │   │   │   ├── Controllers
│   │   │   │   │   ├── AgentConversationListController.php
│   │   │   │   │   ├── AgentConversationsController.php
│   │   │   │   │   ├── AgentMessagesController.php
│   │   │   │   │   ├── ConversationsAssigneeController.php
│   │   │   │   │   ├── ConversationsGroupController.php
│   │   │   │   │   ├── ConversationsSearchController.php
│   │   │   │   │   ├── ConversationsStatusController.php
│   │   │   │   │   ├── ConversationStatusesController.php
│   │   │   │   │   ├── ConversationTagsController.php
│   │   │   │   │   ├── ConversationViewsController.php
│   │   │   │   │   ├── HelpDeskAutocompleteController.php
│   │   │   │   │   ├── MergeConversationsController.php
│   │   │   │   │   ├── OriginalReplyEmailController.php
│   │   │   │   │   ├── RecentCustomerConversationsController.php
│   │   │   │   │   └── ViewListController.php
│   │   │   │   └── Notifications
│   │   │   │       ├── Ticketing
│   │   │   │       │   ├── Assigned
│   │   │   │       │   ├── Messages
│   │   │   │       │   ├── BaseConversationNotification.php
│   │   │   │       │   └── ConversationCreatedNotif.php
│   │   │   │       ├── TicketIsLocked.php
│   │   │   │       ├── TicketRejected.php
│   │   │   │       └── TriggerEmailNotification.php
│   │   │   ├── Commands
│   │   │   │   └── DeleteTestConversationsCommand.php
│   │   │   ├── Customer
│   │   │   │   ├── Actions
│   │   │   │   │   ├── CreateTicketAsCustomer.php
│   │   │   │   │   └── SubmitMessageAsCustomer.php
│   │   │   │   └── Controllers
│   │   │   │       ├── CustomerMessagesController.php
│   │   │   │       ├── CustomerNewTicketPageDataController.php
│   │   │   │       └── CustomerTicketsController.php
│   │   │   ├── Email
│   │   │   │   ├── Commands
│   │   │   │   │   ├── ImportEmailsViaImap.php
│   │   │   │   │   └── RefreshGmailSubscription.php
│   │   │   │   ├── Mailables
│   │   │   │   │   ├── TicketReceivedMailable.php
│   │   │   │   │   └── TicketReplyMailable.php
│   │   │   │   ├── Parsing
│   │   │   │   │   ├── ParsedEmail.php
│   │   │   │   │   ├── StripAndPurifyEmailBody.php
│   │   │   │   │   ├── StripEmailSignature.php
│   │   │   │   │   └── StripQuotedEmailText.php
│   │   │   │   ├── Transformers
│   │   │   │   │   ├── MailgunMailTransformer.php
│   │   │   │   │   └── MimeMailTransformer.php
│   │   │   │   ├── Validators
│   │   │   │   │   ├── GmailApiCredentialsValidator.php
│   │   │   │   │   └── ImapCredentialsValidator.php
│   │   │   │   ├── CreateTicketForFailedOutgoingEmail.php
│   │   │   │   ├── EmailStore.php
│   │   │   │   ├── TicketReferenceHash.php
│   │   │   │   └── TransformEmailIntoTicketOrReply.php
│   │   │   ├── Events
│   │   │   │   ├── ConversationCreated.php
│   │   │   │   ├── ConversationMessageCreated.php
│   │   │   │   ├── ConversationsAssignedToAgent.php
│   │   │   │   └── ConversationsUpdated.php
│   │   │   ├── Listeners
│   │   │   │   ├── SendReplyCreatedNotif.php
│   │   │   │   └── SendTicketsAssignedNotif.php
│   │   │   ├── Messages
│   │   │   │   ├── CreateConversationMessage.php
│   │   │   │   └── MessageBodyPurifier.php
│   │   │   ├── Models
│   │   │   │   ├── Conversation.php
│   │   │   │   ├── ConversationItem.php
│   │   │   │   ├── ConversationStatus.php
│   │   │   │   └── ConversationView.php
│   │   │   ├── Policies
│   │   │   │   ├── ConversationFileEntryPolicy.php
│   │   │   │   └── ConversationPolicy.php
│   │   │   └── Traits
│   │   │       └── BuildsConversationResources.php
│   │   ├── Core
│   │   │   ├── Commands
│   │   │   │   └── ResetDemoSiteCommand.php
│   │   │   ├── Controllers
│   │   │   │   └── ResetPasswordController.php
│   │   │   ├── Listeners
│   │   │   │   └── DeleteUserRelations.php
│   │   │   ├── Middleware
│   │   │   │   └── ConfigureCookies.php
│   │   │   ├── AppBootstrapData.php
│   │   │   ├── HelpDeskChannel.php
│   │   │   ├── Modules.php
│   │   │   ├── SitemapGenerator.php
│   │   │   ├── UrlGenerator.php
│   │   │   └── WidgetFlags.php
│   │   ├── Demo
│   │   │   ├── CreateDemoAgents.php
│   │   │   ├── CreateDemoAttachments.php
│   │   │   ├── CreateDemoCampaigns.php
│   │   │   ├── CreateDemoCannedReplies.php
│   │   │   ├── CreateDemoConversations.php
│   │   │   ├── CreateDemoCustomers.php
│   │   │   ├── CreateDemoFields.php
│   │   │   ├── CreateDemoGroups.php
│   │   │   ├── CreateDemoHelpCenter.php
│   │   │   ├── CreateDemoMessages.php
│   │   │   ├── CreateDemoPageVisits.php
│   │   │   ├── CreateDemoSearchTerms.php
│   │   │   ├── CreateDemoTags.php
│   │   │   ├── CreateDemoToolsAndFlows.php
│   │   │   ├── CreateDemoViews.php
│   │   │   └── ResetDemoSite.php
│   │   ├── HelpCenter
│   │   │   ├── Actions
│   │   │   │   ├── AddIdToAllHtmlHeadings.php
│   │   │   │   ├── AggregateSearchTerms.php
│   │   │   │   ├── CrupdateArticle.php
│   │   │   │   ├── DeleteMultipleArticles.php
│   │   │   │   ├── ExportCategoryAsMarkdown.php
│   │   │   │   ├── ExportHelpCenter.php
│   │   │   │   ├── GenerateArticleContentNav.php
│   │   │   │   ├── HcArticleLoader.php
│   │   │   │   ├── HcCategoryLoader.php
│   │   │   │   ├── HcImagesExporter.php
│   │   │   │   ├── HcLandingPageLoader.php
│   │   │   │   ├── ImportHelpCenter.php
│   │   │   │   ├── PerformArticleBatchAction.php
│   │   │   │   └── SearchHcArticles.php
│   │   │   ├── Controllers
│   │   │   │   ├── HcActionsController.php
│   │   │   │   ├── HcArticleAttachmentsController.php
│   │   │   │   ├── HcArticleAuthorController.php
│   │   │   │   ├── HcArticleController.php
│   │   │   │   ├── HcArticleFeedbackController.php
│   │   │   │   ├── HcArticleSearchController.php
│   │   │   │   ├── HcCategoryController.php
│   │   │   │   ├── HcLandingPageController.php
│   │   │   │   ├── HelpCenterManagerController.php
│   │   │   │   └── SearchTermController.php
│   │   │   ├── Jobs
│   │   │   │   └── IncrementArticleViews.php
│   │   │   ├── Models
│   │   │   │   ├── HcArticle.php
│   │   │   │   ├── HcArticleFeedback.php
│   │   │   │   ├── HcCategory.php
│   │   │   │   └── SearchTerm.php
│   │   │   ├── Policies
│   │   │   │   └── HcArticlePolicy.php
│   │   │   ├── Requests
│   │   │   │   ├── ModifyHcArticle.php
│   │   │   │   └── ModifyHcCategory.php
│   │   │   ├── Traits
│   │   │   │   └── FiltersByVisibleToRole.php
│   │   │   └── ArticleCollection.php
│   │   ├── Models
│   │   │   └── User.php
│   │   ├── Providers
│   │   │   ├── AppServiceProvider.php
│   │   │   └── TelescopeServiceProvider.php
│   │   ├── Reports
│   │   │   ├── Actions
│   │   │   │   ├── ConversationsOverviewReport
│   │   │   │   │   ├── BusiestTimeOfDayReport.php
│   │   │   │   │   ├── ConversationAgentsReport.php
│   │   │   │   │   ├── ConversationTagsReport.php
│   │   │   │   │   ├── FirstReplyTimesReport.php
│   │   │   │   │   ├── HelpdeskReports.php
│   │   │   │   │   ├── NewConversationsReport.php
│   │   │   │   │   └── TaggedConversationsReport.php
│   │   │   │   ├── GetAnalyticsHeaderData.php
│   │   │   │   ├── HelpCenterSearchReport.php
│   │   │   │   └── PopularArticlesReport.php
│   │   │   ├── Controllers
│   │   │   │   └── HelpdeskReportsController.php
│   │   │   └── Policies
│   │   │       └── HelpdeskReportPolicy.php
│   │   ├── Team
│   │   │   ├── Controllers
│   │   │   │   ├── AgentInvitesController.php
│   │   │   │   ├── AgentsController.php
│   │   │   │   ├── CompactAgentsController.php
│   │   │   │   └── GroupsController.php
│   │   │   ├── Events
│   │   │   │   └── AgentUpdated.php
│   │   │   ├── Models
│   │   │   │   ├── AgentInvite.php
│   │   │   │   ├── AgentSettings.php
│   │   │   │   └── Group.php
│   │   │   ├── Notifications
│   │   │   │   └── AgentInvitation.php
│   │   │   ├── Policies
│   │   │   │   └── GroupPolicy.php
│   │   │   ├── Traits
│   │   │   │   └── CanBeAgent.php
│   │   │   └── LoadAllCompactAgents.php
│   │   ├── Triggers
│   │   │   ├── Actions
│   │   │   │   ├── Actions.php
│   │   │   │   ├── AddNoteToConversationAction.php
│   │   │   │   ├── AddTagsToConversationAction.php
│   │   │   │   ├── AssignConversationToAgentAction.php
│   │   │   │   ├── ChangeConversationStatusAction.php
│   │   │   │   ├── DeleteConversationAction.php
│   │   │   │   ├── MoveConversationToCategoryAction.php
│   │   │   │   ├── RemoveTagsFromConversationAction.php
│   │   │   │   ├── SendEmailToUserAction.php
│   │   │   │   ├── TransferConversationToGroupAction.php
│   │   │   │   └── TriggerActionInterface.php
│   │   │   ├── Conditions
│   │   │   │   ├── Conversation
│   │   │   │   │   ├── ConversationAssigneeCondition.php
│   │   │   │   │   ├── ConversationAttachmentsCondition.php
│   │   │   │   │   ├── ConversationBodyCondition.php
│   │   │   │   │   ├── ConversationCategoryCondition.php
│   │   │   │   │   ├── ConversationMailboxAddressCondition.php
│   │   │   │   │   ├── ConversationStatusCondition.php
│   │   │   │   │   ├── ConversationSubjectCondition.php
│   │   │   │   │   └── ConversationTypeCondition.php
│   │   │   │   ├── Customer
│   │   │   │   │   ├── CustomerEmailCondition.php
│   │   │   │   │   ├── CustomerLocationCondition.php
│   │   │   │   │   ├── CustomerNameCondition.php
│   │   │   │   │   ├── CustomerPageVisitsCountCondition.php
│   │   │   │   │   ├── CustomerVisitedUrlCondition.php
│   │   │   │   │   └── CustomerVisitsCountCondition.php
│   │   │   │   ├── Event
│   │   │   │   │   └── EventTypeCondition.php
│   │   │   │   ├── Timeframe
│   │   │   │   │   ├── TimeframeHoursSinceClosedCondition.php
│   │   │   │   │   ├── TimeframeHoursSinceCreatedCondition.php
│   │   │   │   │   ├── TimeframeHoursSinceLastActivityCondition.php
│   │   │   │   │   └── TimeframeHoursSinceLastReplyCondition.php
│   │   │   │   ├── BaseCondition.php
│   │   │   │   ├── Conditions.php
│   │   │   │   └── ValuesComparator.php
│   │   │   ├── Controllers
│   │   │   │   └── TriggerController.php
│   │   │   ├── Models
│   │   │   │   └── Trigger.php
│   │   │   ├── Policies
│   │   │   │   └── TriggerPolicy.php
│   │   │   ├── Requests
│   │   │   │   └── ModifyTrigger.php
│   │   │   ├── TriggersConfig.php
│   │   │   └── TriggersCycle.php
│   │   └── Webhooks
│   │       └── Controllers
│   │           ├── EmailApiWebhookController.php
│   │           ├── GmailWebhookController.php
│   │           └── MailgunWebhookController.php
│   ├── bootstrap
│   │   ├── cache
│   │   │   └── .gitignore
│   │   └── app.php
│   ├── common
│   │   ├── foundation
│   │   │   ├── config
│   │   │   │   ├── seo
│   │   │   │   │   └── common.php
│   │   │   │   ├── analytics.php
│   │   │   │   ├── app.php
│   │   │   │   ├── broadcasting.php
│   │   │   │   ├── cache.php
│   │   │   │   ├── database.php
│   │   │   │   ├── filesystems.php
│   │   │   │   ├── fortify.php
│   │   │   │   ├── geoip.php
│   │   │   │   ├── log-viewer.php
│   │   │   │   ├── logging.php
│   │   │   │   ├── mail.php
│   │   │   │   ├── menus.php
│   │   │   │   ├── sanctum.php
│   │   │   │   ├── scout.php
│   │   │   │   ├── sentry.php
│   │   │   │   ├── services.php
│   │   │   │   └── setting-validators.php
│   │   │   ├── database
│   │   │   │   ├── migrations
│   │   │   │   │   ├── 2014_10_12_000000_create_users_table.php
│   │   │   │   │   ├── 2014_10_12_100000_create_password_resets_table.php
│   │   │   │   │   ├── 2015_04_127_156842_create_social_profiles_table.php
│   │   │   │   │   ├── 2015_05_29_131549_create_settings_table.php
│   │   │   │   │   ├── 2015_10_23_164355_create_follows_table.php
│   │   │   │   │   ├── 2016_05_12_190852_create_tags_table.php
│   │   │   │   │   ├── 2016_05_12_190958_create_taggables_table.php
│   │   │   │   │   ├── 2016_05_26_170044_create_uploads_table.php
│   │   │   │   │   ├── 2016_05_27_143158_create_uploadables_table.php
│   │   │   │   │   ├── 2016_07_14_153703_create_groups_table.php
│   │   │   │   │   ├── 2016_07_14_153921_create_user_group_table.php
│   │   │   │   │   ├── 2017_07_02_120142_create_pages_table.php
│   │   │   │   │   ├── 2017_07_11_122825_create_localizations_table.php
│   │   │   │   │   ├── 2017_08_26_131330_add_private_field_to_settings_table.php
│   │   │   │   │   ├── 2017_09_17_144728_add_columns_to_users_table.php
│   │   │   │   │   ├── 2017_09_17_152854_make_password_column_nullable.php
│   │   │   │   │   ├── 2017_09_30_152855_make_settings_value_column_nullable.php
│   │   │   │   │   ├── 2017_10_01_152897_add_public_column_to_uploads_table.php
│   │   │   │   │   ├── 2017_12_04_132911_add_avatar_column_to_users_table.php
│   │   │   │   │   ├── 2018_01_10_140732_create_subscriptions_table.php
│   │   │   │   │   ├── 2018_01_10_140746_add_billing_to_users_table.php
│   │   │   │   │   ├── 2018_01_10_161706_create_billing_plans_table.php
│   │   │   │   │   ├── 2018_07_26_142339_rename_groups_to_roles.php
│   │   │   │   │   ├── 2018_07_26_142842_rename_user_role_table_columns_to_roles.php
│   │   │   │   │   ├── 2018_08_07_124200_rename_uploads_to_file_entries.php
│   │   │   │   │   ├── 2018_08_07_124327_refactor_file_entries_columns.php
│   │   │   │   │   ├── 2018_08_07_130653_add_folder_path_column_to_file_entries_table.php
│   │   │   │   │   ├── 2018_08_07_140440_migrate_file_entry_users_to_many_to_many.php
│   │   │   │   │   ├── 2018_08_15_132225_move_uploads_into_subfolders.php
│   │   │   │   │   ├── 2018_08_31_104145_rename_uploadables_table.php
│   │   │   │   │   ├── 2018_08_31_104325_rename_file_entry_models_table_columns.php
│   │   │   │   │   ├── 2018_11_26_171703_add_type_and_title_columns_to_pages_table.php
│   │   │   │   │   ├── 2018_12_01_144233_change_unique_index_on_tags_table.php
│   │   │   │   │   ├── 2019_02_16_150049_delete_old_seo_settings.php
│   │   │   │   │   ├── 2019_02_24_141457_create_jobs_table.php
│   │   │   │   │   ├── 2019_03_11_162627_add_preview_token_to_file_entries_table.php
│   │   │   │   │   ├── 2019_03_12_160803_add_thumbnail_column_to_file_entries_table.php
│   │   │   │   │   ├── 2019_03_16_161836_add_paypal_id_column_to_billing_plans_table.php
│   │   │   │   │   ├── 2019_05_14_120930_index_description_column_in_file_entries_table.php
│   │   │   │   │   ├── 2019_06_08_120504_create_custom_domains_table.php
│   │   │   │   │   ├── 2019_06_13_140318_add_user_id_column_to_pages_table.php
│   │   │   │   │   ├── 2019_06_15_114320_rename_pages_table_to_custom_pages.php
│   │   │   │   │   ├── 2019_06_18_133933_create_permissions_table.php
│   │   │   │   │   ├── 2019_06_18_134203_create_permissionables_table.php
│   │   │   │   │   ├── 2019_06_18_135822_rename_permissions_columns.php
│   │   │   │   │   ├── 2019_07_08_122001_create_css_themes_table.php
│   │   │   │   │   ├── 2019_07_20_141752_create_invoices_table.php
│   │   │   │   │   ├── 2019_08_19_121112_add_global_column_to_custom_domains_table.php
│   │   │   │   │   ├── 2019_09_13_141123_change_plan_amount_to_float.php
│   │   │   │   │   ├── 2019_10_14_171943_add_index_to_username_column.php
│   │   │   │   │   ├── 2019_10_20_143522_create_comments_table.php
│   │   │   │   │   ├── 2019_10_23_134520_create_notifications_table.php
│   │   │   │   │   ├── 2019_11_21_144956_add_resource_id_and_type_to_custom_domains_table.php
│   │   │   │   │   ├── 2019_12_14_000001_create_personal_access_tokens_table.php
│   │   │   │   │   ├── 2019_12_14_194512_rename_public_path_column_to_disk_prefix.php
│   │   │   │   │   ├── 2019_12_24_165237_change_file_size_column_default_value_to_0.php
│   │   │   │   │   ├── 2019_12_28_190836_update_file_entry_models_table_to_v2.php
│   │   │   │   │   ├── 2019_12_28_191105_move_user_file_entry_table_records_to_file_entry_models.php
│   │   │   │   │   ├── 2020_01_26_143733_create_notification_subscriptions_table.php
│   │   │   │   │   ├── 2020_03_03_140720_add_language_col_to_localizations_table.php
│   │   │   │   │   ├── 2020_03_03_143142_add_lang_code_to_existing_localizations.php
│   │   │   │   │   ├── 2020_04_14_163347_add_hidden_column_to_plans_table.php
│   │   │   │   │   ├── 2020_06_27_180040_add_verified_at_column_to_users_table.php
│   │   │   │   │   ├── 2020_06_27_180253_move_confirmed_column_to_email_verified_at.php
│   │   │   │   │   ├── 2020_07_15_144024_fix_issues_with_migration_to_laravel_7.php
│   │   │   │   │   ├── 2020_07_22_165126_create_workspaces_table.php
│   │   │   │   │   ├── 2020_07_23_145652_create_workspace_invites_table.php
│   │   │   │   │   ├── 2020_07_23_164502_create_workspace_user_table.php
│   │   │   │   │   ├── 2020_07_26_165349_add_columns_to_roles_table.php
│   │   │   │   │   ├── 2020_07_29_141418_add_workspace_id_column_to_workspaceable_models.php
│   │   │   │   │   ├── 2020_07_30_152330_add_type_column_to_permissions_table.php
│   │   │   │   │   ├── 2020_08_29_165057_add_hide_nav_column_to_custom_pages_table.php
│   │   │   │   │   ├── 2021_04_22_172459_add_internal_columm_to_roles_table.php
│   │   │   │   │   ├── 2021_05_03_173446_add_deleted_column_to_comments_table.php
│   │   │   │   │   ├── 2021_06_04_143405_add_workspace_id_col_to_custom_domains_table.php
│   │   │   │   │   ├── 2021_06_04_143406_add_workspace_id_col_to_custom_pages_table.php
│   │   │   │   │   ├── 2021_06_04_143406_add_workspace_id_col_to_file_entries_table.php
│   │   │   │   │   ├── 2021_06_05_182202_create_csv_exports_table.php
│   │   │   │   │   ├── 2021_06_18_161030_rename_gateway_col_in_subscriptions_table.php
│   │   │   │   │   ├── 2021_06_19_111939_add_owner_id_column_to_file_entries_table.php
│   │   │   │   │   ├── 2021_06_19_112035_materialize_owner_id_in_file_entries_table.php
│   │   │   │   │   ├── 2021_07_17_093454_add_created_at_col_to_user_role_table.php
│   │   │   │   │   ├── 2021_09_30_123758_slugify_tag_name_column.php
│   │   │   │   │   ├── 2021_10_13_132915_add_token_cols_to_social_profiles_table.php
│   │   │   │   │   ├── 2022_04_08_122553_change_default_workspace_id_from_null_to_zero.php
│   │   │   │   │   ├── 2022_04_23_115027_add_id_to_all_menus.php
│   │   │   │   │   ├── 2022_08_10_200344_add_produce_id_column_to_subscriptions_table.php
│   │   │   │   │   ├── 2022_08_11_160401_create_prices_table.php
│   │   │   │   │   ├── 2022_08_11_170041_create_products_table.php
│   │   │   │   │   ├── 2022_08_11_170117_move_billing_plans_to_products_and_prices_tables.php
│   │   │   │   │   ├── 2022_08_17_184337_add_card_expires_column_to_users_table.php
│   │   │   │   │   ├── 2022_08_24_192127_migrate_common_settings_to_v3.php
│   │   │   │   │   ├── 2022_09_03_164633_add_expires_at_column_to_personal_access_tokens_table.php
│   │   │   │   │   ├── 2022_09_28_121423_migrate_notif_settings_from_array_to_obj.php
│   │   │   │   │   ├── 2022_11_06_115107_increase_file_name_column_length.php
│   │   │   │   │   ├── 2023_03_17_175502_add_user_id_to_tags_table.php
│   │   │   │   │   ├── 2023_03_17_180355_change_name_index_to_name_user_id_in_tags_table.php
│   │   │   │   │   ├── 2023_05_09_124348_create_bans_table.php
│   │   │   │   │   ├── 2023_05_09_133514_add_banned_at_column_to_users_table.php
│   │   │   │   │   ├── 2023_05_11_200001_add_two_factor_columns_to_users_table.php
│   │   │   │   │   ├── 2023_05_13_132948_active_sessions_table.php
│   │   │   │   │   ├── 2023_05_16_150805_change_social_profiles_token_length.php
│   │   │   │   │   ├── 2023_06_07_000001_create_pulse_tables.php
│   │   │   │   │   ├── 2023_06_10_131615_add_pos_and_neg_votes_to_comments_table.php
│   │   │   │   │   ├── 2023_06_10_132135_add_comment_ratings_table.php
│   │   │   │   │   ├── 2023_06_11_124655_create_comment_reports_table.php
│   │   │   │   │   ├── 2023_08_08_103123_add_timestamp_indexes_to_comments_table.php
│   │   │   │   │   ├── 2023_08_31_124910_update_model_types_from_namespace_to_string.php
│   │   │   │   │   ├── 2023_12_10_124446_upgrade_css_themes_table_to_v3.php
│   │   │   │   │   ├── 2023_12_18_141540_add_search_indices_to_users_table.php
│   │   │   │   │   ├── 2023_12_19_122804_add_uuid_column_to_failed_jobs_table.php
│   │   │   │   │   ├── 2023_12_23_121618_encrypt_secret_settings.php
│   │   │   │   │   ├── 2024_02_05_103042_change_avatar_column_to_text.php
│   │   │   │   │   ├── 2024_05_08_131134_add_gateway_status_column_to_subscriptions_table.php
│   │   │   │   │   ├── 2024_05_08_151815_increase_uuid_column_length_in_invoices_table.php
│   │   │   │   │   ├── 2024_05_10_151600_add_paypal_id_to_users_table.php
│   │   │   │   │   ├── 2024_05_12_133925_create_schedule_log_table.php
│   │   │   │   │   ├── 2024_05_15_123455_create_outgoing_email_log_table.php
│   │   │   │   │   ├── 2024_05_16_142030_create_otp_codes_table.php
│   │   │   │   │   ├── 2024_05_23_134009_add_logs_menu_item_to_admin_menu.php
│   │   │   │   │   ├── 2024_06_05_122254_add_notified_column_to_invoices_table.php
│   │   │   │   │   ├── 2024_06_15_123230_create_jobs_table.php
│   │   │   │   │   ├── 2024_07_27_153953_add_order_column_to_roles_table.php
│   │   │   │   │   ├── 2024_08_09_132933_add_type_column_to_css_themes_table.php
│   │   │   │   │   ├── 2024_08_26_125216_rename_avatar_to_image_in_users_table.php
│   │   │   │   │   ├── 2024_09_15_134634_make_owner_id_in_file_entries_table_nullable.php
│   │   │   │   │   ├── 2025_02_14_125923_rename_first_name_to_name_in_users_table.php
│   │   │   │   │   ├── 2025_02_14_130052_move_last_name_into_name_column.php
│   │   │   │   │   ├── 2025_02_17_135914_add_technology_columns_to_active_sessions_table.php
│   │   │   │   │   ├── 2025_02_20_134834_rename_active_sessions_table_to_user_sessions.php
│   │   │   │   │   ├── 2025_02_20_134834_rename_password_resets_table_to_password_reset_tokens.php
│   │   │   │   │   ├── 2025_02_21_143813_add_type_column_to_users_table.php
│   │   │   │   │   ├── 2025_03_01_140056_rename_env_keys_to_laravel_11_version.php
│   │   │   │   │   ├── 2025_04_24_133112_rename_sitewide_role_type_to_users.php
│   │   │   │   │   ├── 2025_04_24_153904_remove_unique_index_from_permissions_name.php
│   │   │   │   │   ├── 2025_04_25_115727_delete_old_permissions.php
│   │   │   │   │   ├── 2025_05_03_162427_remove_appearance_from_menu_settings.php
│   │   │   │   │   ├── 2025_05_07_132416_add_index_to_updated_at_in_user_sessions_table.php
│   │   │   │   │   ├── 2025_09_13_140753_rename-background-colors-to-bg.php
│   │   │   │   │   ├── 2025_09_18_134252_add_backend_id_and_upload_type_to_file_entries_table.php
│   │   │   │   │   ├── 2025_09_27_134839_migrate_storage_credentials_to_backends.php
│   │   │   │   │   ├── 2025_09_30_123336_add_relation_type_column_to_file_entry_models_table.php
│   │   │   │   │   ├── 2025_10_11_105157_make_country_in_user_sessions_nullable.php
│   │   │   │   │   └── 2025_11_09_144816_add_description_column_to_roles_table.php
│   │   │   │   └── seeders
│   │   │   │       ├── CssThemesTableSeeder.php
│   │   │   │       ├── LocalizationsTableSeeder.php
│   │   │   │       ├── PermissionTableSeeder.php
│   │   │   │       ├── RolesTableSeeder.php
│   │   │   │       └── UploadBackendsSeeder.php
│   │   │   ├── resources
│   │   │   │   ├── client
│   │   │   │   │   ├── ace-editor
│   │   │   │   │   │   ├── ace-dialog.tsx
│   │   │   │   │   │   └── ace-editor.tsx
│   │   │   │   │   ├── admin
│   │   │   │   │   │   ├── ads
│   │   │   │   │   │   ├── analytics
│   │   │   │   │   │   ├── channels
│   │   │   │   │   │   ├── custom-pages
│   │   │   │   │   │   ├── file-entry
│   │   │   │   │   │   ├── logging
│   │   │   │   │   │   ├── menus
│   │   │   │   │   │   ├── plans
│   │   │   │   │   │   ├── roles
│   │   │   │   │   │   ├── settings
│   │   │   │   │   │   ├── subscriptions
│   │   │   │   │   │   ├── tags
│   │   │   │   │   │   ├── translations
│   │   │   │   │   │   ├── users
│   │   │   │   │   │   ├── admin-layout.tsx
│   │   │   │   │   │   ├── admin-sidebar.tsx
│   │   │   │   │   │   ├── common-admin-queries.ts
│   │   │   │   │   │   ├── crupdate-resource-layout.tsx
│   │   │   │   │   │   └── use-admin-site-alerts.ts
│   │   │   │   │   ├── ai
│   │   │   │   │   │   ├── modify-text-with-ai
│   │   │   │   │   │   └── wand-sparkle-icon.tsx
│   │   │   │   │   ├── article-editor
│   │   │   │   │   │   ├── article-editor-menubar.tsx
│   │   │   │   │   │   ├── article-editor-page.tsx
│   │   │   │   │   │   ├── article-editor-sticky-header.tsx
│   │   │   │   │   │   ├── article-editor-tiptap-extensions.ts
│   │   │   │   │   │   └── article-editor-title.tsx
│   │   │   │   │   ├── auth
│   │   │   │   │   │   ├── guards
│   │   │   │   │   │   ├── requests
│   │   │   │   │   │   ├── ui
│   │   │   │   │   │   ├── access-token.ts
│   │   │   │   │   │   ├── auth-routes.tsx
│   │   │   │   │   │   ├── base-backend-user.ts
│   │   │   │   │   │   ├── permission.ts
│   │   │   │   │   │   ├── role.ts
│   │   │   │   │   │   ├── social-profile.ts
│   │   │   │   │   │   ├── use-auth.ts
│   │   │   │   │   │   └── user-avatar.tsx
│   │   │   │   │   ├── background-selector
│   │   │   │   │   │   ├── image-background-tab
│   │   │   │   │   │   ├── svg-bgs
│   │   │   │   │   │   ├── background-selector-button.tsx
│   │   │   │   │   │   ├── background-selector-config.ts
│   │   │   │   │   │   ├── background-selector.tsx
│   │   │   │   │   │   ├── bg-config-from-css-props.ts
│   │   │   │   │   │   ├── bg-selector-tab-props.tsx
│   │   │   │   │   │   ├── color-background-tab.tsx
│   │   │   │   │   │   ├── color-backgrounds.ts
│   │   │   │   │   │   ├── css-props-from-bg-config.ts
│   │   │   │   │   │   ├── gradient-background-tab.tsx
│   │   │   │   │   │   ├── gradient-backgrounds.ts
│   │   │   │   │   │   └── image-backgrounds.ts
│   │   │   │   │   ├── billing
│   │   │   │   │   │   ├── billing-page
│   │   │   │   │   │   ├── checkout
│   │   │   │   │   │   ├── pricing-table
│   │   │   │   │   │   ├── upgrade
│   │   │   │   │   │   ├── billing-plan.ts
│   │   │   │   │   │   ├── billing-queries.ts
│   │   │   │   │   │   ├── billing-redirect-message.tsx
│   │   │   │   │   │   ├── formatted-price.tsx
│   │   │   │   │   │   ├── invoice.ts
│   │   │   │   │   │   ├── price.ts
│   │   │   │   │   │   ├── product.ts
│   │   │   │   │   │   └── subscription.ts
│   │   │   │   │   ├── captcha
│   │   │   │   │   │   ├── captcha-container.tsx
│   │   │   │   │   │   └── use-captcha.ts
│   │   │   │   │   ├── channels
│   │   │   │   │   │   ├── requests
│   │   │   │   │   │   ├── channel.ts
│   │   │   │   │   │   └── use-channel-query-params.ts
│   │   │   │   │   ├── charts
│   │   │   │   │   │   ├── data
│   │   │   │   │   │   ├── bar-chart.tsx
│   │   │   │   │   │   ├── base-chart.tsx
│   │   │   │   │   │   ├── busiest-time-of-day-chart.tsx
│   │   │   │   │   │   ├── chart-colors.tsx
│   │   │   │   │   │   ├── chart-icon.tsx
│   │   │   │   │   │   ├── chart-layout.tsx
│   │   │   │   │   │   ├── chart-loading-indicator.tsx
│   │   │   │   │   │   ├── lazy-chart.tsx
│   │   │   │   │   │   ├── line-chart.tsx
│   │   │   │   │   │   ├── polar-area-chart.tsx
│   │   │   │   │   │   └── report-table.tsx
│   │   │   │   │   ├── comments
│   │   │   │   │   │   ├── comment-list
│   │   │   │   │   │   ├── comments-datatable-page
│   │   │   │   │   │   ├── requests
│   │   │   │   │   │   ├── comment.ts
│   │   │   │   │   │   ├── commentable.ts
│   │   │   │   │   │   └── new-comment-form.tsx
│   │   │   │   │   ├── contact
│   │   │   │   │   │   ├── contact-us-page.tsx
│   │   │   │   │   │   └── use-submit-contact-form.ts
│   │   │   │   │   ├── core
│   │   │   │   │   │   ├── settings
│   │   │   │   │   │   ├── base-backend-bootstrap-data.ts
│   │   │   │   │   │   ├── common-provider.tsx
│   │   │   │   │   │   ├── common-routes.tsx
│   │   │   │   │   │   ├── common.css
│   │   │   │   │   │   ├── global-loading-progress.tsx
│   │   │   │   │   │   ├── scrollbar.css
│   │   │   │   │   │   └── theme-provider.tsx
│   │   │   │   │   ├── custom-domains
│   │   │   │   │   │   ├── datatable
│   │   │   │   │   │   ├── custom-domain.ts
│   │   │   │   │   │   ├── use-custom-domains.ts
│   │   │   │   │   │   └── use-default-custom-domain-host.ts
│   │   │   │   │   ├── custom-page
│   │   │   │   │   │   ├── custom-page-body.css
│   │   │   │   │   │   ├── custom-page-body.tsx
│   │   │   │   │   │   ├── custom-page-layout.tsx
│   │   │   │   │   │   └── use-custom-page.ts
│   │   │   │   │   ├── datatable
│   │   │   │   │   │   ├── column-templates
│   │   │   │   │   │   ├── csv-export
│   │   │   │   │   │   ├── filters
│   │   │   │   │   │   ├── page
│   │   │   │   │   │   ├── requests
│   │   │   │   │   │   ├── column-config.tsx
│   │   │   │   │   │   ├── data-table-add-item-button.tsx
│   │   │   │   │   │   ├── data-table-header.tsx
│   │   │   │   │   │   ├── data-table-pagination-footer.tsx
│   │   │   │   │   │   └── data-table.tsx
│   │   │   │   │   ├── errors
│   │   │   │   │   │   ├── backend-error-response.ts
│   │   │   │   │   │   ├── ignored-sentry-errors.ts
│   │   │   │   │   │   ├── on-form-query-error.ts
│   │   │   │   │   │   └── page-error-message.tsx
│   │   │   │   │   ├── http
│   │   │   │   │   │   ├── backend-response
│   │   │   │   │   │   ├── ignition-error-dialog
│   │   │   │   │   │   ├── echo-custom-auth-endpoint.ts
│   │   │   │   │   │   ├── error-status-is.ts
│   │   │   │   │   │   ├── get-axios-error-message.ts
│   │   │   │   │   │   ├── get-echo-socket-id.ts
│   │   │   │   │   │   ├── make-streamed-fetch-request.ts
│   │   │   │   │   │   ├── page-meta-tags.tsx
│   │   │   │   │   │   ├── page-status.tsx
│   │   │   │   │   │   ├── queries-file-helpers.ts
│   │   │   │   │   │   ├── query-client.ts
│   │   │   │   │   │   ├── show-http-error-toast.ts
│   │   │   │   │   │   ├── use-url-backed-tabs.ts
│   │   │   │   │   │   └── value-lists.ts
│   │   │   │   │   ├── locale-switcher
│   │   │   │   │   │   ├── change-locale.ts
│   │   │   │   │   │   └── locale-switcher.tsx
│   │   │   │   │   ├── menus
│   │   │   │   │   │   ├── custom-menu.tsx
│   │   │   │   │   │   ├── menu-config.ts
│   │   │   │   │   │   ├── menu-item-category.ts
│   │   │   │   │   │   └── use-custom-menu.ts
│   │   │   │   │   ├── notifications
│   │   │   │   │   │   ├── dialog
│   │   │   │   │   │   ├── empty-state
│   │   │   │   │   │   ├── requests
│   │   │   │   │   │   ├── subscriptions
│   │   │   │   │   │   ├── database-notification.ts
│   │   │   │   │   │   ├── notification-line.tsx
│   │   │   │   │   │   ├── notification-list.tsx
│   │   │   │   │   │   ├── notification-routes.tsx
│   │   │   │   │   │   └── notifications-page.tsx
│   │   │   │   │   ├── player
│   │   │   │   │   │   ├── hooks
│   │   │   │   │   │   ├── providers
│   │   │   │   │   │   ├── state
│   │   │   │   │   │   ├── ui
│   │   │   │   │   │   ├── utils
│   │   │   │   │   │   ├── handle-player-keybinds.ts
│   │   │   │   │   │   ├── media-item.ts
│   │   │   │   │   │   ├── player-context.tsx
│   │   │   │   │   │   ├── player-queue.ts
│   │   │   │   │   │   └── player-styles.css
│   │   │   │   │   ├── reports
│   │   │   │   │   │   ├── requests
│   │   │   │   │   │   └── Reportable.ts
│   │   │   │   │   ├── seo
│   │   │   │   │   │   ├── default-meta-tags.tsx
│   │   │   │   │   │   ├── helmet.tsx
│   │   │   │   │   │   ├── meta-tag.tsx
│   │   │   │   │   │   └── static-page-title.tsx
│   │   │   │   │   ├── swagger
│   │   │   │   │   │   └── swagger-api-docs-page.tsx
│   │   │   │   │   ├── tags
│   │   │   │   │   │   ├── form-normalized-model-chip-field.tsx
│   │   │   │   │   │   ├── manage-tags-dialog.tsx
│   │   │   │   │   │   ├── tag.ts
│   │   │   │   │   │   ├── use-attach-tag-to-taggables.ts
│   │   │   │   │   │   ├── use-detach-tag-from-taggables.ts
│   │   │   │   │   │   ├── use-sync-taggable-tags.ts
│   │   │   │   │   │   ├── use-taggable-tags.ts
│   │   │   │   │   │   └── use-tags.ts
│   │   │   │   │   ├── text-editor
│   │   │   │   │   │   ├── extensions
│   │   │   │   │   │   ├── highlight
│   │   │   │   │   │   ├── menubar
│   │   │   │   │   │   ├── floating-toolbar.tsx
│   │   │   │   │   │   ├── insert-link-into-text-editor.ts
│   │   │   │   │   │   ├── mode-button.tsx
│   │   │   │   │   │   ├── text-format-buttons.tsx
│   │   │   │   │   │   ├── tiptap-editor-content.tsx
│   │   │   │   │   │   ├── tiptap-editor-context.ts
│   │   │   │   │   │   ├── tiptap-editor-provider.tsx
│   │   │   │   │   │   └── use-tiptap-editor.ts
│   │   │   │   │   ├── ui
│   │   │   │   │   │   ├── cookie-notice
│   │   │   │   │   │   ├── dashboard-layout
│   │   │   │   │   │   ├── font-selector
│   │   │   │   │   │   ├── footer
│   │   │   │   │   │   ├── icon-picker
│   │   │   │   │   │   ├── infinite-scroll
│   │   │   │   │   │   ├── landing-page
│   │   │   │   │   │   ├── library
│   │   │   │   │   │   ├── navigation
│   │   │   │   │   │   ├── normalized-model
│   │   │   │   │   │   ├── not-found-page
│   │   │   │   │   │   ├── other
│   │   │   │   │   │   └── tables
│   │   │   │   │   ├── uploads
│   │   │   │   │   │   ├── components
│   │   │   │   │   │   ├── requests
│   │   │   │   │   │   ├── uploader
│   │   │   │   │   │   ├── common-upload-type.ts
│   │   │   │   │   │   ├── file-entry-urls.ts
│   │   │   │   │   │   ├── file-entry.ts
│   │   │   │   │   │   └── file-type-colors.css
│   │   │   │   │   ├── users
│   │   │   │   │   │   ├── queries
│   │   │   │   │   │   ├── follow-button.tsx
│   │   │   │   │   │   ├── select-user-dialog.tsx
│   │   │   │   │   │   └── user-profile-link.tsx
│   │   │   │   │   ├── votes
│   │   │   │   │   │   ├── requests
│   │   │   │   │   │   ├── thumb-buttons.tsx
│   │   │   │   │   │   ├── votable-model.ts
│   │   │   │   │   │   └── vote.ts
│   │   │   │   │   ├── workspace
│   │   │   │   │   │   ├── notifications
│   │   │   │   │   │   ├── requests
│   │   │   │   │   │   ├── types
│   │   │   │   │   │   ├── active-workspace-id-context.tsx
│   │   │   │   │   │   ├── active-workspace-id.ts
│   │   │   │   │   │   ├── leave-workspace-confirmation.tsx
│   │   │   │   │   │   ├── new-workspace-dialog.tsx
│   │   │   │   │   │   ├── rename-workspace-dialog.tsx
│   │   │   │   │   │   ├── user-workspaces.ts
│   │   │   │   │   │   ├── workspace-members-dialog.tsx
│   │   │   │   │   │   └── workspace-selector.tsx
│   │   │   │   │   ├── shared.tailwind.js
│   │   │   │   │   └── types.d.ts
│   │   │   │   ├── defaults
│   │   │   │   │   ├── default-settings.php
│   │   │   │   │   ├── lorem.html
│   │   │   │   │   ├── menu-editor-config.php
│   │   │   │   │   ├── permissions.php
│   │   │   │   │   ├── privacy-policy.html
│   │   │   │   │   └── terms-of-service.html
│   │   │   │   ├── lists
│   │   │   │   │   ├── countries.json
│   │   │   │   │   ├── currencies.json
│   │   │   │   │   ├── google-fonts.json
│   │   │   │   │   ├── languages.json
│   │   │   │   │   └── timezones.json
│   │   │   │   └── views
│   │   │   │       ├── billing
│   │   │   │       │   └── invoice.blade.php
│   │   │   │       ├── domains
│   │   │   │       │   └── domain-connected-message.blade.php
│   │   │   │       ├── emails
│   │   │   │       │   └── mail-validation.blade.php
│   │   │   │       ├── install
│   │   │   │       │   ├── components
│   │   │   │       │   ├── admin.blade.php
│   │   │   │       │   ├── database.blade.php
│   │   │   │       │   ├── finalize.blade.php
│   │   │   │       │   ├── introduction.blade.php
│   │   │   │       │   ├── requirements.blade.php
│   │   │   │       │   ├── update-complete.blade.php
│   │   │   │       │   └── update.blade.php
│   │   │   │       ├── oauth
│   │   │   │       │   └── popup.blade.php
│   │   │   │       ├── prerender
│   │   │   │       │   ├── base.blade.php
│   │   │   │       │   └── meta-tags.blade.php
│   │   │   │       └── framework.blade.php
│   │   │   ├── routes
│   │   │   │   ├── api.php
│   │   │   │   ├── web.php
│   │   │   │   └── webhooks.php
│   │   │   └── src
│   │   │       ├── Admin
│   │   │       │   ├── Analytics
│   │   │       │   │   ├── Actions
│   │   │       │   │   └── AnalyticsController.php
│   │   │       │   ├── Sitemap
│   │   │       │   │   ├── BaseSitemapGenerator.php
│   │   │       │   │   └── SitemapController.php
│   │   │       │   ├── CacheController.php
│   │   │       │   ├── ImpersonateUserController.php
│   │   │       │   └── SiteAlertsController.php
│   │   │       ├── AI
│   │   │       │   ├── Chat
│   │   │       │   │   ├── AssistantMessage.php
│   │   │       │   │   └── UserMessage.php
│   │   │       │   ├── Embeddings
│   │   │       │   │   └── EmbeddingsResponse.php
│   │   │       │   ├── Exceptions
│   │   │       │   │   └── LlmException.php
│   │   │       │   ├── Images
│   │   │       │   │   └── GenerateImageResponse.php
│   │   │       │   ├── Providers
│   │   │       │   │   ├── Anthropic
│   │   │       │   │   ├── Gemini
│   │   │       │   │   ├── OpenAI
│   │   │       │   │   ├── OpenRouter
│   │   │       │   │   ├── BasePrismProvider.php
│   │   │       │   │   ├── BaseProvider.php
│   │   │       │   │   ├── LlmProvider.php
│   │   │       │   │   └── ProviderParams.php
│   │   │       │   ├── Requests
│   │   │       │   │   └── EnhanceTextRequest.php
│   │   │       │   ├── Text
│   │   │       │   │   ├── EnhanceTextWithAIPrompts.php
│   │   │       │   │   └── TextResponse.php
│   │   │       │   ├── Tools
│   │   │       │   │   └── BaseTool.php
│   │   │       │   ├── Llm.php
│   │   │       │   ├── ModifyTextWithAI.php
│   │   │       │   └── TokenUsage.php
│   │   │       ├── Auth
│   │   │       │   ├── Actions
│   │   │       │   │   ├── CreateUser.php
│   │   │       │   │   ├── DeleteUsers.php
│   │   │       │   │   ├── PaginateUsers.php
│   │   │       │   │   └── UpdateUser.php
│   │   │       │   ├── Commands
│   │   │       │   │   ├── DeleteExpiredBansCommand.php
│   │   │       │   │   └── DeleteExpiredOtpCodesCommand.php
│   │   │       │   ├── Controllers
│   │   │       │   │   ├── AccessTokenController.php
│   │   │       │   │   ├── BanUsersController.php
│   │   │       │   │   ├── EmailVerificationController.php
│   │   │       │   │   ├── MobileAuthController.php
│   │   │       │   │   ├── PasswordController.php
│   │   │       │   │   ├── PermissionsController.php
│   │   │       │   │   ├── SocialAuthController.php
│   │   │       │   │   ├── TwoFactorAuthenticationController.php
│   │   │       │   │   ├── TwoFactorQrCodeController.php
│   │   │       │   │   ├── UserController.php
│   │   │       │   │   ├── UserFollowedUsersController.php
│   │   │       │   │   ├── UserFollowersController.php
│   │   │       │   │   └── UserSessionsController.php
│   │   │       │   ├── Events
│   │   │       │   │   ├── SocialConnected.php
│   │   │       │   │   ├── SocialLogin.php
│   │   │       │   │   ├── UserCreated.php
│   │   │       │   │   └── UsersDeleted.php
│   │   │       │   ├── Factories
│   │   │       │   │   └── UserSessionFactory.php
│   │   │       │   ├── Fortify
│   │   │       │   │   ├── AppFortifyServiceProvider.php
│   │   │       │   │   ├── FortifyRegisterUser.php
│   │   │       │   │   ├── LoginResponse.php
│   │   │       │   │   ├── LogoutResponse.php
│   │   │       │   │   ├── PasswordValidationRules.php
│   │   │       │   │   ├── RegisterResponse.php
│   │   │       │   │   ├── ResetUserPassword.php
│   │   │       │   │   ├── TwoFactorLoginResponse.php
│   │   │       │   │   ├── UpdateUserPassword.php
│   │   │       │   │   └── ValidateLoginCredentials.php
│   │   │       │   ├── Jobs
│   │   │       │   │   ├── ExportRolesCsv.php
│   │   │       │   │   └── ExportUsersCsv.php
│   │   │       │   ├── Middleware
│   │   │       │   │   ├── ForbidBannedUser.php
│   │   │       │   │   ├── OptionalAuthenticate.php
│   │   │       │   │   └── VerifyApiAccessMiddleware.php
│   │   │       │   ├── Notifications
│   │   │       │   │   └── VerifyEmailWithOtp.php
│   │   │       │   ├── Permissions
│   │   │       │   │   ├── Policies
│   │   │       │   │   ├── Traits
│   │   │       │   │   └── Permission.php
│   │   │       │   ├── Requests
│   │   │       │   │   └── CrupdateUserRequest.php
│   │   │       │   ├── Roles
│   │   │       │   │   ├── CrupdateRole.php
│   │   │       │   │   ├── Role.php
│   │   │       │   │   ├── RolesController.php
│   │   │       │   │   └── UserRolesController.php
│   │   │       │   ├── Traits
│   │   │       │   │   ├── Bannable.php
│   │   │       │   │   ├── HasAvatarAttribute.php
│   │   │       │   │   └── HasDisplayNameAttribute.php
│   │   │       │   ├── Validators
│   │   │       │   │   ├── EmailVerifiedValidator.php
│   │   │       │   │   ├── HashIsValid.php
│   │   │       │   │   └── PasswordIsValid.php
│   │   │       │   ├── Ban.php
│   │   │       │   ├── BaseUser.php
│   │   │       │   ├── Oauth.php
│   │   │       │   ├── OtpCode.php
│   │   │       │   ├── SocialProfile.php
│   │   │       │   └── UserSession.php
│   │   │       ├── Billing
│   │   │       │   ├── Gateways
│   │   │       │   │   ├── Actions
│   │   │       │   │   ├── Contracts
│   │   │       │   │   ├── Paypal
│   │   │       │   │   ├── Stripe
│   │   │       │   │   └── SyncProductsController.php
│   │   │       │   ├── Invoices
│   │   │       │   │   ├── Invoice.php
│   │   │       │   │   ├── InvoiceController.php
│   │   │       │   │   └── InvoicePolicy.php
│   │   │       │   ├── Listeners
│   │   │       │   │   └── SyncPlansWhenBillingSettingsChange.php
│   │   │       │   ├── Models
│   │   │       │   │   ├── Price.php
│   │   │       │   │   └── Product.php
│   │   │       │   ├── Notifications
│   │   │       │   │   ├── NewInvoiceAvailable.php
│   │   │       │   │   └── PaymentFailed.php
│   │   │       │   ├── Products
│   │   │       │   │   ├── Actions
│   │   │       │   │   └── ProductsController.php
│   │   │       │   ├── Subscriptions
│   │   │       │   │   ├── SubscriptionFactory.php
│   │   │       │   │   └── SubscriptionsController.php
│   │   │       │   ├── Billable.php
│   │   │       │   ├── GatewayException.php
│   │   │       │   ├── PricingPageController.php
│   │   │       │   └── Subscription.php
│   │   │       ├── Channels
│   │   │       │   ├── BaseChannel.php
│   │   │       │   ├── ChannelContentOrderController.php
│   │   │       │   ├── ChannelController.php
│   │   │       │   ├── ChannelItemController.php
│   │   │       │   ├── CrupdateChannel.php
│   │   │       │   ├── CrupdateChannelRequest.php
│   │   │       │   ├── DeleteChannels.php
│   │   │       │   ├── GenerateChannelsFromConfig.php
│   │   │       │   ├── LoadChannelContent.php
│   │   │       │   ├── LoadChannelMenuItems.php
│   │   │       │   ├── PaginateChannels.php
│   │   │       │   └── UpdateAllChannelsContent.php
│   │   │       ├── Comments
│   │   │       │   ├── Controllers
│   │   │       │   │   ├── CommentableController.php
│   │   │       │   │   └── CommentController.php
│   │   │       │   ├── Notifications
│   │   │       │   │   └── CommentReceivedReply.php
│   │   │       │   ├── Comment.php
│   │   │       │   ├── CommentFactory.php
│   │   │       │   ├── CommentPolicy.php
│   │   │       │   ├── CommentReport.php
│   │   │       │   ├── CommentVote.php
│   │   │       │   ├── CrupdateComment.php
│   │   │       │   ├── CrupdateCommentRequest.php
│   │   │       │   ├── LoadChildComments.php
│   │   │       │   └── PaginateModelComments.php
│   │   │       ├── Core
│   │   │       │   ├── Bootstrap
│   │   │       │   │   ├── BaseBootstrapData.php
│   │   │       │   │   ├── BootstrapData.php
│   │   │       │   │   └── MobileBootstrapData.php
│   │   │       │   ├── Commands
│   │   │       │   │   ├── GenerateChecksums.php
│   │   │       │   │   ├── GenerateSitemap.php
│   │   │       │   │   ├── SeedCommand.php
│   │   │       │   │   └── UpdateSimplePaginateTables.php
│   │   │       │   ├── Contracts
│   │   │       │   │   └── AppUrlGenerator.php
│   │   │       │   ├── Controllers
│   │   │       │   │   ├── BootstrapController.php
│   │   │       │   │   └── HomeController.php
│   │   │       │   ├── Demo
│   │   │       │   │   └── BlocksFunctionalityOnDemoSite.php
│   │   │       │   ├── Exceptions
│   │   │       │   │   ├── AccessResponseWithAction.php
│   │   │       │   │   ├── AccessResponseWithPermission.php
│   │   │       │   │   └── BaseExceptionHandler.php
│   │   │       │   ├── Install
│   │   │       │   │   ├── Commands
│   │   │       │   │   ├── Updater
│   │   │       │   │   ├── CheckSiteHealth.php
│   │   │       │   │   ├── CreateDefaultCustomPages.php
│   │   │       │   │   ├── CreateDefaultMenus.php
│   │   │       │   │   ├── InsertDefaultSettings.php
│   │   │       │   │   ├── InstallController.php
│   │   │       │   │   ├── LicenseController.php
│   │   │       │   │   ├── RedirectIfNotInstalledMiddleware.php
│   │   │       │   │   ├── UpdateActions.php
│   │   │       │   │   └── UpdateController.php
│   │   │       │   ├── Manifest
│   │   │       │   │   ├── BuildManifestFile.php
│   │   │       │   │   └── manifest-example.json
│   │   │       │   ├── Middleware
│   │   │       │   │   ├── BroadcastServiceProvider.php
│   │   │       │   │   ├── EnableDebugIfLoggedInAsAdmin.php
│   │   │       │   │   ├── EnsureEmailIsVerified.php
│   │   │       │   │   ├── EnsureFrontendRequestsAreStateful.php
│   │   │       │   │   ├── IsAdmin.php
│   │   │       │   │   ├── JsonMiddleware.php
│   │   │       │   │   ├── PrerenderIfCrawler.php
│   │   │       │   │   ├── RedirectIfAuthenticated.php
│   │   │       │   │   ├── RestrictDemoSiteFunctionality.php
│   │   │       │   │   ├── SetAppLocale.php
│   │   │       │   │   ├── SetSentryUserMiddleware.php
│   │   │       │   │   ├── SimulateSlowConnectionMiddleware.php
│   │   │       │   │   ├── TrustHosts.php
│   │   │       │   │   ├── TrustProxies.php
│   │   │       │   │   └── VerifyCsrfToken.php
│   │   │       │   ├── Policies
│   │   │       │   │   ├── BasePolicy.php
│   │   │       │   │   ├── FileEntryPolicy.php
│   │   │       │   │   ├── LocalizationPolicy.php
│   │   │       │   │   ├── MailTemplatePolicy.php
│   │   │       │   │   ├── PagePolicy.php
│   │   │       │   │   ├── ProductPolicy.php
│   │   │       │   │   ├── ReportPolicy.php
│   │   │       │   │   ├── RolePolicy.php
│   │   │       │   │   ├── SettingPolicy.php
│   │   │       │   │   ├── SubscriptionPolicy.php
│   │   │       │   │   ├── TagPolicy.php
│   │   │       │   │   └── UserPolicy.php
│   │   │       │   ├── Prerender
│   │   │       │   │   ├── Actions
│   │   │       │   │   ├── BaseUrlGenerator.php
│   │   │       │   │   ├── HandlesSeo.php
│   │   │       │   │   └── MetaTags.php
│   │   │       │   ├── Rendering
│   │   │       │   │   ├── CrawlerDetector.php
│   │   │       │   │   └── RendersClientSideApp.php
│   │   │       │   ├── Resources
│   │   │       │   │   ├── BaseJsonResource.php
│   │   │       │   │   └── PaginatedResourceCollection.php
│   │   │       │   ├── Values
│   │   │       │   │   ├── PermissionConfig.php
│   │   │       │   │   ├── ValueLists.php
│   │   │       │   │   └── ValueListsController.php
│   │   │       │   ├── Application.php
│   │   │       │   ├── AppUrl.php
│   │   │       │   ├── BaseController.php
│   │   │       │   ├── BaseFormRequest.php
│   │   │       │   ├── BaseModel.php
│   │   │       │   └── HttpClient.php
│   │   │       ├── Csv
│   │   │       │   ├── BaseCsvExportController.php
│   │   │       │   ├── BaseCsvExportJob.php
│   │   │       │   ├── CommonCsvExportController.php
│   │   │       │   ├── CsvExport.php
│   │   │       │   ├── CsvExportReadyNotif.php
│   │   │       │   └── DeleteExpiredCsvExports.php
│   │   │       ├── Database
│   │   │       │   ├── Datasource
│   │   │       │   │   ├── Filters
│   │   │       │   │   ├── Datasource.php
│   │   │       │   │   └── DatasourceFilters.php
│   │   │       │   ├── Metrics
│   │   │       │   │   ├── Traits
│   │   │       │   │   ├── BaseMetric.php
│   │   │       │   │   ├── MetricDateRange.php
│   │   │       │   │   ├── Partition.php
│   │   │       │   │   ├── Trend.php
│   │   │       │   │   ├── TrendDateExpression.php
│   │   │       │   │   └── ValueMetric.php
│   │   │       │   ├── Traits
│   │   │       │   │   └── AddsIndexToExistingTable.php
│   │   │       │   ├── CustomLengthAwarePaginator.php
│   │   │       │   ├── CustomSimplePaginator.php
│   │   │       │   ├── MigrateAndSeed.php
│   │   │       │   └── Paginator.php
│   │   │       ├── Domains
│   │   │       │   ├── Actions
│   │   │       │   │   ├── DeleteCustomDomains.php
│   │   │       │   │   └── MaybeShowCustomDomainsConnectedMessage.php
│   │   │       │   ├── Validation
│   │   │       │   │   ├── HostIsNotBlacklisted.php
│   │   │       │   │   ├── ValidateLinkWithGoogleSafeBrowsing.php
│   │   │       │   │   └── ValidateLinkWithPhishtank.php
│   │   │       │   ├── CustomDomain.php
│   │   │       │   ├── CustomDomainController.php
│   │   │       │   ├── CustomDomainFactory.php
│   │   │       │   ├── CustomDomainPolicy.php
│   │   │       │   ├── CustomDomainsEnabled.php
│   │   │       │   └── DeletedCustomDomains.php
│   │   │       ├── Files
│   │   │       │   ├── Actions
│   │   │       │   │   ├── Deletion
│   │   │       │   │   ├── CreateFileEntry.php
│   │   │       │   │   ├── FileUploadValidator.php
│   │   │       │   │   ├── GetServerMaxUploadSize.php
│   │   │       │   │   ├── GetUserSpaceUsage.php
│   │   │       │   │   ├── StoreFile.php
│   │   │       │   │   └── SyncFileEntryModels.php
│   │   │       │   ├── Commands
│   │   │       │   │   └── DeleteUploadArtifacts.php
│   │   │       │   ├── Controllers
│   │   │       │   │   ├── AddPreviewTokenController.php
│   │   │       │   │   ├── DownloadFileController.php
│   │   │       │   │   ├── FileEntriesController.php
│   │   │       │   │   ├── RestoreDeletedEntriesController.php
│   │   │       │   │   ├── ServerMaxUploadSizeController.php
│   │   │       │   │   └── ValidateBackendCredentialsController.php
│   │   │       │   ├── Events
│   │   │       │   │   ├── FileEntriesDeleted.php
│   │   │       │   │   ├── FileEntriesMoved.php
│   │   │       │   │   ├── FileEntriesRestored.php
│   │   │       │   │   ├── FileEntryCreated.php
│   │   │       │   │   └── FileUploaded.php
│   │   │       │   ├── Listeners
│   │   │       │   │   └── CreateThumbnailForUploadedFile.php
│   │   │       │   ├── Providers
│   │   │       │   │   └── RegisterCustomFlysystemProviders.php
│   │   │       │   ├── Response
│   │   │       │   │   ├── DownloadFilesResponse.php
│   │   │       │   │   ├── FileResponse.php
│   │   │       │   │   ├── FileResponseFactory.php
│   │   │       │   │   ├── RangeFileResponse.php
│   │   │       │   │   ├── RemoteFileResponse.php
│   │   │       │   │   ├── StreamedFileResponse.php
│   │   │       │   │   ├── XAccelRedirectFileResponse.php
│   │   │       │   │   └── XSendFileResponse.php
│   │   │       │   ├── S3
│   │   │       │   │   ├── AbortOldS3Uploads.php
│   │   │       │   │   ├── InteractsWithS3Api.php
│   │   │       │   │   ├── S3CorsController.php
│   │   │       │   │   ├── S3FileEntryController.php
│   │   │       │   │   ├── S3MultipartUploadController.php
│   │   │       │   │   └── S3SimpleUploadController.php
│   │   │       │   ├── Traits
│   │   │       │   │   ├── ChunksChildEntries.php
│   │   │       │   │   ├── GetsEntryTypeFromMime.php
│   │   │       │   │   ├── HandlesEntryPaths.php
│   │   │       │   │   ├── HasAttachedFileEntries.php
│   │   │       │   │   └── HashesId.php
│   │   │       │   ├── Tus
│   │   │       │   │   ├── Exceptions
│   │   │       │   │   ├── DeleteExpiredTusUploads.php
│   │   │       │   │   ├── TusCache.php
│   │   │       │   │   ├── TusFile.php
│   │   │       │   │   ├── TusFileEntryController.php
│   │   │       │   │   ├── TusServer.php
│   │   │       │   │   └── TusServiceProvider.php
│   │   │       │   ├── Uploads
│   │   │       │   │   ├── CountUploadingBackendFiles.php
│   │   │       │   │   ├── UploadBackend.php
│   │   │       │   │   ├── UploadDiskLocation.php
│   │   │       │   │   ├── Uploads.php
│   │   │       │   │   └── UploadType.php
│   │   │       │   ├── FileDownloader.php
│   │   │       │   ├── FileEntry.php
│   │   │       │   ├── FileEntryPayload.php
│   │   │       │   ├── FileEntryPivot.php
│   │   │       │   └── FileEntryUser.php
│   │   │       ├── Generators
│   │   │       │   ├── Action
│   │   │       │   │   ├── stubs
│   │   │       │   │   └── GenerateAction.php
│   │   │       │   ├── Controller
│   │   │       │   │   ├── stubs
│   │   │       │   │   └── GenerateController.php
│   │   │       │   ├── Model
│   │   │       │   │   ├── stubs
│   │   │       │   │   └── GenerateModel.php
│   │   │       │   ├── Policy
│   │   │       │   │   ├── stubs
│   │   │       │   │   └── GeneratePolicy.php
│   │   │       │   └── Request
│   │   │       │       ├── stubs
│   │   │       │       └── GenerateRequest.php
│   │   │       ├── Localizations
│   │   │       │   ├── Commands
│   │   │       │   │   ├── ExportTranslations.php
│   │   │       │   │   └── GenerateFooTranslations.php
│   │   │       │   ├── Listeners
│   │   │       │   │   └── UpdateAllUsersLanguageWhenDefaultLocaleChanges.php
│   │   │       │   ├── Localization.php
│   │   │       │   ├── LocalizationsController.php
│   │   │       │   ├── LocalizationsRepository.php
│   │   │       │   └── UserLocaleController.php
│   │   │       ├── Logging
│   │   │       │   ├── Error
│   │   │       │   │   └── ErrorLogController.php
│   │   │       │   ├── Mail
│   │   │       │   │   ├── OutgoingEmailLogController.php
│   │   │       │   │   ├── OutgoingEmailLogItem.php
│   │   │       │   │   └── OutgoingEmailLogSubscriber.php
│   │   │       │   ├── Schedule
│   │   │       │   │   ├── MonitorsSchedule.php
│   │   │       │   │   ├── ScheduleHealthCommand.php
│   │   │       │   │   ├── ScheduleLogController.php
│   │   │       │   │   └── ScheduleLogItem.php
│   │   │       │   └── CleanLogTables.php
│   │   │       ├── Notifications
│   │   │       │   ├── ContactPageMessage.php
│   │   │       │   ├── ErrorNotification.php
│   │   │       │   ├── GetsUserPreferredChannels.php
│   │   │       │   ├── NotificationController.php
│   │   │       │   ├── NotificationSubscription.php
│   │   │       │   ├── NotificationSubscriptionsController.php
│   │   │       │   └── SubscribeUserToNotifications.php
│   │   │       ├── Pages
│   │   │       │   ├── ContactPageController.php
│   │   │       │   ├── CrupdatePage.php
│   │   │       │   ├── CustomPage.php
│   │   │       │   ├── CustomPageController.php
│   │   │       │   ├── CustomPageFactory.php
│   │   │       │   └── LoadCustomPageMenuItems.php
│   │   │       ├── Reports
│   │   │       │   └── ReportController.php
│   │   │       ├── Search
│   │   │       │   ├── Commands
│   │   │       │   │   └── ImportRecordsIntoScoutCommand.php
│   │   │       │   ├── Controllers
│   │   │       │   │   ├── NormalizedModelsController.php
│   │   │       │   │   └── SearchSettingsController.php
│   │   │       │   ├── Drivers
│   │   │       │   │   └── Mysql
│   │   │       │   ├── ImportRecordsIntoScout.php
│   │   │       │   └── SupportsVectorSearch.php
│   │   │       ├── ServerTiming
│   │   │       │   ├── ServerTiming.php
│   │   │       │   └── ServerTimingMiddleware.php
│   │   │       ├── Settings
│   │   │       │   ├── Events
│   │   │       │   │   └── SettingsSaved.php
│   │   │       │   ├── Mail
│   │   │       │   │   ├── ConnectGmailAccountController.php
│   │   │       │   │   ├── GmailApiMailTransport.php
│   │   │       │   │   ├── GmailClient.php
│   │   │       │   │   └── HandleConnectGmailOauthCallback.php
│   │   │       │   ├── Manager
│   │   │       │   │   ├── LoadSettingsManagerData.php
│   │   │       │   │   ├── RedactSensitiveSettings.php
│   │   │       │   │   ├── SettingsController.php
│   │   │       │   │   ├── StoreSettingsManagerData.php
│   │   │       │   │   └── ValidateSettingsManagerData.php
│   │   │       │   ├── Models
│   │   │       │   │   ├── Setting.php
│   │   │       │   │   └── TransformsSettingsTableRowValue.php
│   │   │       │   ├── Themes
│   │   │       │   │   ├── CrupdateCssTheme.php
│   │   │       │   │   ├── CrupdateCssThemeRequest.php
│   │   │       │   │   ├── CssTheme.php
│   │   │       │   │   ├── CssThemeController.php
│   │   │       │   │   └── CssThemePolicy.php
│   │   │       │   ├── Uploading
│   │   │       │   │   └── DropboxRefreshTokenController.php
│   │   │       │   ├── Validators
│   │   │       │   │   ├── MailCredentials
│   │   │       │   │   ├── AnalyticsCredentialsValidator.php
│   │   │       │   │   ├── CacheConfigValidator.php
│   │   │       │   │   ├── CaptchaCredentialsValidator.php
│   │   │       │   │   ├── FacebookLoginValidator.php
│   │   │       │   │   ├── GoogleLoginValidator.php
│   │   │       │   │   ├── LoggingCredentialsValidator.php
│   │   │       │   │   ├── PaypalCredentialsValidator.php
│   │   │       │   │   ├── QueueCredentialsValidator.php
│   │   │       │   │   ├── SearchConfigValidator.php
│   │   │       │   │   ├── SettingsValidator.php
│   │   │       │   │   ├── StaticFileDeliveryValidator.php
│   │   │       │   │   ├── StripeCredentialsValidator.php
│   │   │       │   │   ├── TwitterLoginValidator.php
│   │   │       │   │   └── WebsocketCredentialsValidator.php
│   │   │       │   ├── DotEnvEditor.php
│   │   │       │   ├── GenerateFavicon.php
│   │   │       │   ├── LoadDefaultSettings.php
│   │   │       │   ├── Settings.php
│   │   │       │   └── SyncSettingsWithFileEntries.php
│   │   │       ├── Tags
│   │   │       │   ├── Tag.php
│   │   │       │   ├── TagController.php
│   │   │       │   ├── Taggable.php
│   │   │       │   ├── TaggableController.php
│   │   │       │   └── TagResource.php
│   │   │       ├── Validation
│   │   │       │   ├── Validators
│   │   │       │   │   ├── EmailsAreValid.php
│   │   │       │   │   └── MultiDateFormatValidator.php
│   │   │       │   └── CaptchaTokenValid.php
│   │   │       ├── Votes
│   │   │       │   ├── OrdersByWeightedScore.php
│   │   │       │   ├── StoreVote.php
│   │   │       │   ├── Vote.php
│   │   │       │   └── VoteController.php
│   │   │       ├── Websockets
│   │   │       │   ├── API
│   │   │       │   │   ├── AblyAPI.php
│   │   │       │   │   ├── NullAPI.php
│   │   │       │   │   ├── PusherAPI.php
│   │   │       │   │   ├── ReverbAPI.php
│   │   │       │   │   ├── WebsocketAPI.php
│   │   │       │   │   └── WebsocketProviderAPI.php
│   │   │       │   └── GetWebsocketCredentialsForClient.php
│   │   │       ├── Workspaces
│   │   │       │   ├── Actions
│   │   │       │   │   ├── CrupdateWorkspace.php
│   │   │       │   │   ├── DeleteInviteNotification.php
│   │   │       │   │   ├── DeleteWorkspaces.php
│   │   │       │   │   ├── JoinWorkspace.php
│   │   │       │   │   └── RemoveMemberFromWorkspace.php
│   │   │       │   ├── Controllers
│   │   │       │   │   ├── WorkspaceController.php
│   │   │       │   │   ├── WorkspaceInvitesController.php
│   │   │       │   │   └── WorkspaceMembersController.php
│   │   │       │   ├── Events
│   │   │       │   │   └── WorkspaceDeleted.php
│   │   │       │   ├── Listeners
│   │   │       │   │   └── AttachWorkspaceToUser.php
│   │   │       │   ├── Notifications
│   │   │       │   │   └── WorkspaceInvitation.php
│   │   │       │   ├── Policies
│   │   │       │   │   ├── WorkspacedResourcePolicy.php
│   │   │       │   │   ├── WorkspaceMemberPolicy.php
│   │   │       │   │   └── WorkspacePolicy.php
│   │   │       │   ├── Requests
│   │   │       │   │   └── CrupdateWorkspaceRequest.php
│   │   │       │   ├── Rules
│   │   │       │   │   └── UniqueWorkspacedResource.php
│   │   │       │   ├── Traits
│   │   │       │   │   └── BelongsToWorkspace.php
│   │   │       │   ├── ActiveWorkspace.php
│   │   │       │   ├── UserWorkspacesController.php
│   │   │       │   ├── Workspace.php
│   │   │       │   ├── WorkspaceFactory.php
│   │   │       │   ├── WorkspaceInvite.php
│   │   │       │   └── WorkspaceMember.php
│   │   │       ├── CommonServiceProvider.php
│   │   │       └── helpers.php
│   ├── config
│   │   ├── seo
│   │   │   └── home
│   │   │       └── show.php
│   │   ├── app.php
│   │   ├── clockwork.php
│   │   ├── filesystems.php
│   │   ├── modules.php
│   │   ├── prism.php
│   │   ├── registration-rules.php
│   │   ├── reverb.php
│   │   ├── scout.php
│   │   ├── setting-validators.php
│   │   ├── telescope.php
│   │   └── themes.php
│   ├── database
│   │   ├── migrations
│   │   │   ├── 2016_05_10_172103_create_conversations_table.php
│   │   │   ├── 2016_05_20_181143_create_conversation_content_table.php
│   │   │   ├── 2016_05_26_170044_create_uploads_table.php
│   │   │   ├── 2016_06_05_164503_create_canned_replies_table.php
│   │   │   ├── 2016_06_19_155233_create_articles_table.php
│   │   │   ├── 2016_06_19_155255_create_categories_table.php
│   │   │   ├── 2016_06_19_171231_create_category_article_table.php
│   │   │   ├── 2016_10_14_155303_create_article_feedback_table.php
│   │   │   ├── 2016_10_27_130211_create_triggers_table.php
│   │   │   ├── 2017_04_17_113507_create_emails_table.php
│   │   │   ├── 2017_04_17_113917_create_profiles_table.php
│   │   │   ├── 2017_05_11_132720_rename_profiles_table.php
│   │   │   ├── 2017_06_04_122515_create_failed_jobs_table.php
│   │   │   ├── 2017_08_17_144518_create_search_terms_table.php
│   │   │   ├── 2018_03_06_123008_add_envato_username_column.php
│   │   │   ├── 2018_08_08_100000_create_telescope_entries_table.php
│   │   │   ├── 2019_05_05_123741_update_search_terms_table_to_v2.php
│   │   │   ├── 2019_05_06_123139_add_shared_column_to_canned_replies_table.php
│   │   │   ├── 2019_05_12_132105_add_user_id_column_to_search_terms_table.php
│   │   │   ├── 2019_10_12_153551_add_username_column_to_users_table.php
│   │   │   ├── 2020_06_01_135923_add_user_id_to_triggers_table.php
│   │   │   ├── 2021_08_24_180514_lowercase_custom_seo_in_settings_table.php
│   │   │   ├── 2021_09_18_152852_delete_deprecated_reply_permissions.php
│   │   │   ├── 2021_09_20_165535_add_received_at_email_col_to_tickets_table.php
│   │   │   ├── 2021_09_20_170637_add_email_id_col_to_replies_table.php
│   │   │   ├── 2021_10_09_090023_remove_normalized_term_column_from_search_terms_table.php
│   │   │   ├── 2021_10_09_090024_delete_search_terms_from_ticket_page.php
│   │   │   ├── 2021_10_17_085951_add_sold_at_col_to_purchase_codes_table.php
│   │   │   ├── 2023_08_19_144005_remove_newlines_from_article_bodies.php
│   │   │   ├── 2023_08_25_120734_add_v2_columns_to_articles_table.php
│   │   │   ├── 2023_08_26_105329_move_user_id_to_owner_id_in_file_entries_table.php
│   │   │   ├── 2023_08_26_105742_delete_user_id_column_from_file_entries_table.php
│   │   │   ├── 2023_08_26_142423_assign_default_author_ids_to_articles.php
│   │   │   ├── 2023_11_26_135105_change_hc_urls_in_articles.php
│   │   │   ├── 2023_12_03_144319_add_status_column_to_tickets_table.php
│   │   │   ├── 2023_12_03_144420_move_status_tags_to_tickets_table.php
│   │   │   ├── 2023_12_10_140105_add_position_to_category_article_table.php
│   │   │   ├── 2023_12_10_140137_move_article_position_to_pivot_table.php
│   │   │   ├── 2023_12_18_141653_add_search_indices_to_purchase_codes_table.php
│   │   │   ├── 2023_12_23_154844_migrate_incoming_email_settings_to_v2.php
│   │   │   ├── 2023_12_27_143741_convert_landing_page_config_to_v2.php
│   │   │   ├── 2024_01_23_120731_add_v2_columns_to_categories_table.php
│   │   │   ├── 2024_01_23_144055_unwrap_img_tags_wrapped_with_p.php
│   │   │   ├── 2024_01_31_142808_add_parent_id_index_to_categories_table.php
│   │   │   ├── 2024_02_16_143753_attach_articles_to_category_and_section.php
│   │   │   ├── 2024_07_17_135816_create_page_visits_table.php
│   │   │   ├── 2024_07_24_130217_rename_tickets_table_to_conversations.php
│   │   │   ├── 2024_07_24_132909_rename_replies_table_to_conversation_content.php
│   │   │   ├── 2024_07_26_123620_create_groups_table.php
│   │   │   ├── 2024_07_26_123621_create_group_user_table.php
│   │   │   ├── 2024_07_28_133354_create_agent_settings_table.php
│   │   │   ├── 2024_08_01_143432_create_agent_invites_table.php
│   │   │   ├── 2024_08_06_125910_rename_landing_page_config_to_hc_landing_page.php
│   │   │   ├── 2024_08_30_130558_add_type_column_to_conversations_table.php
│   │   │   ├── 2024_08_30_130559_add_assigned_at_column_to_conversations_table.php
│   │   │   ├── 2024_09_25_135504_updated_canned_replies_table_to_v2.php
│   │   │   ├── 2024_09_28_131928_add_user_id_to_taggables_table.php
│   │   │   ├── 2024_10_18_134610_add_config_column_to_triggers_table.php
│   │   │   ├── 2024_10_24_135312_migrate_triggers_with_db_based_config.php
│   │   │   ├── 2024_11_02_153233_add_rating_column_to_conversations_table.php
│   │   │   ├── 2024_12_10_163346_add_agents_column_to_roles_table.php
│   │   │   ├── 2025_01_05_162312_add_scan_pending_to_articles_table.php
│   │   │   ├── 2025_02_10_162832_create_attributes_table.php
│   │   │   ├── 2025_02_13_162833_create_attributables_table.php
│   │   │   ├── 2025_02_17_140944_make_email_nullable_in_users_table.php
│   │   │   ├── 2025_02_27_145847_add_agent_type_to_users.php
│   │   │   ├── 2025_03_02_190643_set_author_on_conversation_messages.php
│   │   │   ├── 2025_03_05_161529_attach_agents_and_conversations_to_default_group.php
│   │   │   ├── 2025_03_05_172621_create_conversation_views_table.php
│   │   │   ├── 2025_03_15_135744_add_priority_and_status_category_to_conversations_table.php
│   │   │   ├── 2025_03_15_140145_create_conversation_statuses_table.php
│   │   │   ├── 2025_03_15_140601_migrate_existing_tickets_to_new_status_system.php
│   │   │   ├── 2025_03_15_172525_update_conversation_and_messages_types_to_v3.php
│   │   │   ├── 2025_03_29_173504_migrate_ticket_categories_to_custom_attributes.php
│   │   │   ├── 2025_04_17_113955_rename_assigned_to_to_assignee_id.php
│   │   │   ├── 2025_04_17_114535_add_channel_column_to_conversations_table.php
│   │   │   ├── 2025_04_17_114816_populat_channel_column_in_conversations_table.php
│   │   │   ├── 2025_05_30_154634_add_data_column_to_conversation_content_table.php
│   │   │   ├── 2025_05_31_161137_migrate_to_v3.php
│   │   │   ├── 2025_06_22_140954_add_mode_to_conversations_table.php
│   │   │   ├── 2025_08_04_153803_migrate_triggers_to_v3.php
│   │   │   ├── 2025_08_13_112609_update_callouts_in_articles_body.php
│   │   │   ├── 2025_08_21_135632_add_hide_from_structure_column_to_categories_table.php
│   │   │   └── 2025_10_05_132253_add_relation_type_to_file_entry_models.php
│   │   ├── seeders
│   │   │   ├── ConversationStatusesSeeder.php
│   │   │   ├── DatabaseSeeder.php
│   │   │   ├── DefaultGroupSeeder.php
│   │   │   ├── DefaultViewsSeeder.php
│   │   │   └── InternalAttributesSeeder.php
│   │   └── .gitignore
│   ├── modules
│   │   ├── ai
│   │   │   ├── config
│   │   │   │   ├── app.php
│   │   │   │   ├── filesystems.php
│   │   │   │   ├── scout.php
│   │   │   │   ├── searchable_models.php
│   │   │   │   └── setting-validators.php
│   │   │   ├── database
│   │   │   │   ├── migrations
│   │   │   │   │   ├── 2024_10_14_143428_create_conversation_summaries_table.php
│   │   │   │   │   ├── 2024_12_19_152513_create_ai_agent_websites_table.php
│   │   │   │   │   ├── 2024_12_19_164606_create_ai_agent_webpages_table.php
│   │   │   │   │   ├── 2024_12_23_182106_create_ai_agent_chunks_table.php
│   │   │   │   │   ├── 2024_12_24_154317_create_ai_agent_vectors_table.php
│   │   │   │   │   ├── 2025_01_02_145038_create_ai_agent_documents_table.php
│   │   │   │   │   ├── 2025_01_05_174804_mark_existing_articles_for_ingestion.php
│   │   │   │   │   ├── 2025_01_16_133203_create_ai_agent_flows_table.php
│   │   │   │   │   ├── 2025_01_16_133203_create_ai_agent_snippets_table.php
│   │   │   │   │   ├── 2025_01_17_133204_create_ai_agent_sessions_table.php
│   │   │   │   │   ├── 2025_05_15_131541_add_ai_agent_menu_items.php
│   │   │   │   │   ├── 2025_07_09_125258_create_ai_agent_tools_table.php
│   │   │   │   │   ├── 2025_07_17_134606_create_tool_responses_table.php
│   │   │   │   │   ├── 2025_07_17_141809_create_ai_agent_session_tool_response_table.php
│   │   │   │   │   ├── 2026_01_16_144952_create_ai_agents_table.php
│   │   │   │   │   └── 2026_01_16_154953_migrate_single_ai_agent_to_multiple.php
│   │   │   │   └── seeders
│   │   │   │       └── DefaultAiAgentSeeder.php
│   │   │   ├── resources
│   │   │   │   ├── client
│   │   │   │   │   ├── admin
│   │   │   │   │   │   └── settings
│   │   │   │   │   ├── ai-agent
│   │   │   │   │   │   ├── flows
│   │   │   │   │   │   ├── knowledge
│   │   │   │   │   │   ├── preview
│   │   │   │   │   │   ├── reports
│   │   │   │   │   │   ├── settings
│   │   │   │   │   │   ├── tools
│   │   │   │   │   │   ├── ai-agent-page-header.tsx
│   │   │   │   │   │   ├── ai-agent-queries.ts
│   │   │   │   │   │   ├── ai-agent-routes.tsx
│   │   │   │   │   │   └── use-selected-ai-agent.ts
│   │   │   │   │   └── conversation-summary-panel
│   │   │   │   │       ├── conversation-summary-panel.tsx
│   │   │   │   │       ├── conversation-summary.ts
│   │   │   │   │       ├── use-delete-conversation-summary.ts
│   │   │   │   │       └── use-generate-conversation-summary.ts
│   │   │   │   └── views
│   │   │   │       └── prompts
│   │   │   │           ├── chat-with-llm.blade.php
│   │   │   │           ├── classify-user-message.blade.php
│   │   │   │           └── personality.blade.php
│   │   │   ├── routes
│   │   │   │   └── api.php
│   │   │   ├── src
│   │   │   │   ├── Admin
│   │   │   │   │   ├── AiAgentDocumentContentParserValidator.php
│   │   │   │   │   └── LlmProviderValidator.php
│   │   │   │   ├── AiAgent
│   │   │   │   │   ├── Chunks
│   │   │   │   │   │   ├── DeleteEmbeddingArtifacts.php
│   │   │   │   │   │   ├── GenerateChunksForDocument.php
│   │   │   │   │   │   ├── GenerateEmbeddingsForAiAgentChunks.php
│   │   │   │   │   │   └── InsertMultipleChunks.php
│   │   │   │   │   ├── Commands
│   │   │   │   │   │   └── DeleteToolArtifactsCommand.php
│   │   │   │   │   ├── Conversations
│   │   │   │   │   │   ├── Actions
│   │   │   │   │   │   ├── Data
│   │   │   │   │   │   └── AiAgentBroker.php
│   │   │   │   │   ├── Flows
│   │   │   │   │   │   ├── Controllers
│   │   │   │   │   │   ├── Nodes
│   │   │   │   │   │   ├── AiAgentFlowExecutor.php
│   │   │   │   │   │   ├── MessageBuilderData.php
│   │   │   │   │   │   └── SessionContext.php
│   │   │   │   │   ├── Ingest
│   │   │   │   │   │   ├── Articles
│   │   │   │   │   │   ├── Files
│   │   │   │   │   │   ├── Parsing
│   │   │   │   │   │   ├── Snippets
│   │   │   │   │   │   └── Web
│   │   │   │   │   ├── Middleware
│   │   │   │   │   │   └── ScopeConversationsToPreviewMode.php
│   │   │   │   │   ├── Models
│   │   │   │   │   │   ├── AiAgent.php
│   │   │   │   │   │   ├── AiAgentChunk.php
│   │   │   │   │   │   ├── AiAgentDocument.php
│   │   │   │   │   │   ├── AiAgentFlow.php
│   │   │   │   │   │   ├── AiAgentSession.php
│   │   │   │   │   │   ├── AiAgentSnippet.php
│   │   │   │   │   │   ├── AiAgentTool.php
│   │   │   │   │   │   ├── AiAgentVector.php
│   │   │   │   │   │   ├── AiAgentWebpage.php
│   │   │   │   │   │   ├── AiAgentWebsite.php
│   │   │   │   │   │   ├── ConversationSummary.php
│   │   │   │   │   │   └── ToolResponse.php
│   │   │   │   │   ├── Reports
│   │   │   │   │   │   ├── AiAgentConversationsReport.php
│   │   │   │   │   │   ├── AiAgentInvolvmentOverTimeReport.php
│   │   │   │   │   │   ├── AiAgentInvolvmentRateReport.php
│   │   │   │   │   │   └── AiAgentReportsController.php
│   │   │   │   │   ├── Tools
│   │   │   │   │   │   ├── EditorSteps
│   │   │   │   │   │   ├── GenerateResponseSchema.php
│   │   │   │   │   │   ├── ToolBoundToConversation.php
│   │   │   │   │   │   ├── ToolExecutor.php
│   │   │   │   │   │   ├── ToolsController.php
│   │   │   │   │   │   └── UsesToolResponseData.php
│   │   │   │   │   ├── Variables
│   │   │   │   │   │   ├── VariableReplacer.php
│   │   │   │   │   │   └── VariableReplacerData.php
│   │   │   │   │   └── DeleteAiAgent.php
│   │   │   │   ├── Controllers
│   │   │   │   │   ├── AiAgentArticlesController.php
│   │   │   │   │   ├── AiAgentDocumentsController.php
│   │   │   │   │   ├── AiAgentKnowledgeController.php
│   │   │   │   │   ├── AiAgentPreviewController.php
│   │   │   │   │   ├── AiAgentsController.php
│   │   │   │   │   ├── AiAgentSnippetsController.php
│   │   │   │   │   ├── AiAgentWebsiteController.php
│   │   │   │   │   ├── ConversationSummaryController.php
│   │   │   │   │   ├── EnhanceTextWithAIController.php
│   │   │   │   │   └── FlowActionsController.php
│   │   │   │   ├── Policies
│   │   │   │   │   └── AiAgentPolicy.php
│   │   │   │   ├── Summary
│   │   │   │   │   └── CreateConversationSummary.php
│   │   │   │   └── AiServiceProvider.php
│   │   │   └── version.txt
│   │   ├── envato
│   │   │   ├── database
│   │   │   │   └── migrations
│   │   │   │       ├── 2016_12_06_175738_create_purchase_codes_table.php
│   │   │   │       ├── 2025_03_29_145141_create_envato_items_table.php
│   │   │   │       ├── 2025_10_12_134335_add_latest_version_to_envato_items_table.php
│   │   │   │       └── 2025_10_19_134336_update_purchase_codes_table_to_support_domains.php
│   │   │   ├── resources
│   │   │   │   └── client
│   │   │   │       ├── account-settings-purchases-panel
│   │   │   │       │   ├── account-settings-purchases-panel.tsx
│   │   │   │       │   ├── add-purchase-code-dialog.tsx
│   │   │   │       │   └── use-add-purchase-using-code.ts
│   │   │   │       ├── envato-purchase-list
│   │   │   │       │   ├── conversation-page-purchase-list.tsx
│   │   │   │       │   ├── envato-purchase-list.tsx
│   │   │   │       │   └── purchase-code-details-dialog.tsx
│   │   │   │       └── envato-purchase-code.ts
│   │   │   ├── routes
│   │   │   │   ├── api.php
│   │   │   │   └── web.php
│   │   │   └── src
│   │   │       ├── Http
│   │   │       │   └── Controllers
│   │   │       │       ├── EnvatoController.php
│   │   │       │       ├── EnvatoUpdatesController.php
│   │   │       │       └── UserEnvatoPurchasesController.php
│   │   │       ├── Models
│   │   │       │   ├── EnvatoItem.php
│   │   │       │   └── PurchaseCode.php
│   │   │       ├── Purchases
│   │   │       │   ├── ImportEnvatoItems.php
│   │   │       │   └── UserEnvatoPurchases.php
│   │   │       ├── Reports
│   │   │       │   ├── EnvatoCountryReport.php
│   │   │       │   ├── EnvatoEarningsReport.php
│   │   │       │   ├── EnvatoItemsReport.php
│   │   │       │   └── EnvatoReportBuilder.php
│   │   │       ├── Rules
│   │   │       │   ├── EnvatoPurchaseCodeIsValid.php
│   │   │       │   └── EnvatoSupportIsNotExpired.php
│   │   │       ├── SocialiteProviders
│   │   │       │   └── EnvatoProvider.php
│   │   │       ├── EnvatoApiClient.php
│   │   │       └── EnvatoServiceProvider.php
│   │   └── livechat
│   │       ├── config
│   │       │   ├── auth.php
│   │       │   └── site.php
│   │       ├── database
│   │       │   ├── migrations
│   │       │   │   ├── 2024_11_05_152807_create_campaigns_table.php
│   │       │   │   ├── 2024_11_16_143039_create_campaign_impressions_table.php
│   │       │   │   └── 2025_05_15_131542_add_livechat_settings.php
│   │       │   └── seeders
│   │       │       └── LivechatCssThemesTableSeeder.php
│   │       ├── resources
│   │       │   ├── campaign-templates
│   │       │   │   ├── check-in.json
│   │       │   │   ├── discount.json
│   │       │   │   ├── instant-help.json
│   │       │   │   ├── new-feature.json
│   │       │   │   ├── new-product.json
│   │       │   │   ├── newsletter.json
│   │       │   │   ├── pricing-help.json
│   │       │   │   ├── socials.json
│   │       │   │   └── welcome.json
│   │       │   ├── client
│   │       │   │   ├── admin
│   │       │   │   │   └── settings
│   │       │   │   ├── chat-page
│   │       │   │   │   └── chat-page.tsx
│   │       │   │   ├── dashboard
│   │       │   │   │   ├── campaigns
│   │       │   │   │   └── reports
│   │       │   │   ├── widget
│   │       │   │   │   ├── agents
│   │       │   │   │   ├── ai-agent-preview-mode
│   │       │   │   │   ├── campaigns
│   │       │   │   │   ├── chat
│   │       │   │   │   ├── conversation-screen
│   │       │   │   │   ├── help
│   │       │   │   │   ├── home
│   │       │   │   │   ├── hooks
│   │       │   │   │   ├── user
│   │       │   │   │   ├── websockets
│   │       │   │   │   ├── widget-navigation
│   │       │   │   │   ├── chat-widget.tsx
│   │       │   │   │   ├── conversations-list-screen.tsx
│   │       │   │   │   ├── embed-screen.tsx
│   │       │   │   │   ├── hydrate-widget-query-cache-with-initial-data.ts
│   │       │   │   │   ├── livechat-popup.tsx
│   │       │   │   │   ├── livechat-toggle.tsx
│   │       │   │   │   ├── mobile-close-button.tsx
│   │       │   │   │   ├── new-ticket-screen.tsx
│   │       │   │   │   ├── widget-config.ts
│   │       │   │   │   ├── widget-entry.tsx
│   │       │   │   │   ├── widget-flags.ts
│   │       │   │   │   ├── widget-queries.ts
│   │       │   │   │   ├── widget-screen-header.tsx
│   │       │   │   │   ├── widget-store.ts
│   │       │   │   │   └── widget.css
│   │       │   │   └── hc-livechat-widget-loader.tsx
│   │       │   └── views
│   │       │       └── chat-widget.blade.php
│   │       ├── routes
│   │       │   ├── api.php
│   │       │   ├── web.php
│   │       │   └── widget.php
│   │       ├── src
│   │       │   ├── Actions
│   │       │   │   ├── BuildCampaignReport.php
│   │       │   │   └── WidgetBootstrapData.php
│   │       │   ├── Chats
│   │       │   │   ├── BuildNewChatGreeting.php
│   │       │   │   ├── ChatCycle.php
│   │       │   │   ├── CreateChatAsCustomer.php
│   │       │   │   └── StoreChatFormData.php
│   │       │   ├── Commands
│   │       │   │   ├── ChatCycleCommand.php
│   │       │   │   ├── DeleteNeverActiveVisitors.php
│   │       │   │   ├── MarkOldPageVisitsAsEnded.php
│   │       │   │   └── PruneVisitors.php
│   │       │   ├── Controllers
│   │       │   │   ├── CampaignController.php
│   │       │   │   ├── ChatTranscriptController.php
│   │       │   │   ├── LivechatReportsController.php
│   │       │   │   └── UserPageVisitsController.php
│   │       │   ├── Events
│   │       │   │   └── PageVisitCreated.php
│   │       │   ├── Middleware
│   │       │   │   └── LivechatOptionalAuthenticate.php
│   │       │   ├── Models
│   │       │   │   ├── Campaign.php
│   │       │   │   └── CampaignImpression.php
│   │       │   ├── Notifications
│   │       │   │   └── CustomerReceivedReplyWhileOffline.php
│   │       │   ├── Policies
│   │       │   │   └── CampaignPolicy.php
│   │       │   ├── Streaming
│   │       │   │   └── EventEmitter.php
│   │       │   ├── Widget
│   │       │   │   ├── Controllers
│   │       │   │   │   ├── WidgetActiveChatController.php
│   │       │   │   │   ├── WidgetCampaignsController.php
│   │       │   │   │   ├── WidgetChatMessagesController.php
│   │       │   │   │   ├── WidgetConversationsController.php
│   │       │   │   │   ├── WidgetCustomerController.php
│   │       │   │   │   ├── WidgetCustomerEmailController.php
│   │       │   │   │   ├── WidgetCustomerExternalData.php
│   │       │   │   │   ├── WidgetHelpCenterController.php
│   │       │   │   │   ├── WidgetHomeController.php
│   │       │   │   │   └── WidgetVisitsController.php
│   │       │   │   ├── Middleware
│   │       │   │   │   └── AuthenticateWidget.php
│   │       │   │   ├── Users
│   │       │   │   │   ├── ResolveWidgetCustomer.php
│   │       │   │   │   └── WidgetCustomerResource.php
│   │       │   │   ├── HandleLatestUserMessage.php
│   │       │   │   └── WidgetConversationLoader.php
│   │       │   └── LiveChatServiceProvider.php
│   │       └── version.txt
│   ├── public
│   │   ├── demo-files
│   │   │   ├── audio-1.mp3
│   │   │   ├── doc-1.xls
│   │   │   ├── doc-2.pptx
│   │   │   ├── doc-3.doc
│   │   │   ├── image-1.jpg
│   │   │   ├── image-2.jpg
│   │   │   ├── image-3.jpg
│   │   │   └── video-1.mp4
│   │   ├── images
│   │   │   ├── avatars
│   │   │   │   ├── female-1.jpg
│   │   │   │   ├── female-2.jpg
│   │   │   │   ├── female-3.jpg
│   │   │   │   ├── female-4.jpg
│   │   │   │   ├── male-1.jpg
│   │   │   │   ├── male-2.jpg
│   │   │   │   ├── male-3.jpg
│   │   │   │   └── male-4.jpg
│   │   │   ├── browsers
│   │   │   │   ├── brave.svg
│   │   │   │   ├── chrome.svg
│   │   │   │   ├── edge.svg
│   │   │   │   ├── firefox.svg
│   │   │   │   ├── opera.svg
│   │   │   │   └── safari.svg
│   │   │   ├── campaigns
│   │   │   │   ├── templates
│   │   │   │   │   ├── check-in.png
│   │   │   │   │   ├── discount.png
│   │   │   │   │   ├── instant-help.png
│   │   │   │   │   ├── new-feature.png
│   │   │   │   │   ├── new-product.png
│   │   │   │   │   ├── newsletter.png
│   │   │   │   │   ├── pricing-help.png
│   │   │   │   │   ├── socials.png
│   │   │   │   │   └── welcome.png
│   │   │   │   ├── discount.png
│   │   │   │   ├── new-product.png
│   │   │   │   └── welcome.gif
│   │   │   ├── platforms
│   │   │   │   ├── android.png
│   │   │   │   ├── ios.png
│   │   │   │   ├── linux.png
│   │   │   │   ├── osx.png
│   │   │   │   └── windows.png
│   │   │   ├── svg-bgs
│   │   │   │   ├── Alternating-Triangles.svg
│   │   │   │   ├── Angled-Focus.svg
│   │   │   │   ├── Canyon-Funnel.svg
│   │   │   │   ├── Circuit-Board.svg
│   │   │   │   ├── Circular-Focus.svg
│   │   │   │   ├── Confetti-Doodles.svg
│   │   │   │   ├── Farseeing-Eyeball.svg
│   │   │   │   ├── Hurricane-Aperture.svg
│   │   │   │   ├── Icy-Explosion.svg
│   │   │   │   ├── Launch-Day.svg
│   │   │   │   ├── Looney-Loops.svg
│   │   │   │   ├── Monstera-Patch.svg
│   │   │   │   ├── Morphing-Triangles.svg
│   │   │   │   ├── Nuclear-Focalpoint.svg
│   │   │   │   ├── Pointer-Sandwich.svg
│   │   │   │   ├── Protruding-Squares.svg
│   │   │   │   ├── Snow.svg
│   │   │   │   ├── Sprinkle.svg
│   │   │   │   ├── Threads-Ahead.svg
│   │   │   │   └── Zigzag-Curtaintop.svg
│   │   │   ├── hc-header-pattern.svg
│   │   │   ├── logo-dark-mobile-big.png
│   │   │   ├── logo-dark-mobile.png
│   │   │   ├── logo-dark.png
│   │   │   ├── logo-light-mobile.png
│   │   │   └── logo-light.png
│   │   ├── sounds
│   │   │   ├── incoming-chat.mp3
│   │   │   ├── message.mp3
│   │   │   ├── new-visitor.mp3
│   │   │   └── queued-visitor.mp3
│   │   ├── storage
│   │   │   ├── .gitignore
│   │   ├── htaccess.example
│   │   ├── index.php
│   │   ├── livechat-loader.js
│   │   ├── swagger.yaml
│   │   └── web.config
│   ├── resources
│   │   ├── client
│   │   │   ├── admin
│   │   │   │   ├── settings
│   │   │   │   │   ├── envato-settings
│   │   │   │   │   │   ├── envato-settings.tsx
│   │   │   │   │   │   └── use-import-envato-items.ts
│   │   │   │   │   ├── hc
│   │   │   │   │   │   ├── hc-settings.tsx
│   │   │   │   │   │   └── use-import-hc-data-from-zip.ts
│   │   │   │   │   ├── captcha-settings.tsx
│   │   │   │   │   └── tickets-settings.tsx
│   │   │   │   ├── admin-config.ts
│   │   │   │   ├── admin-queries.ts
│   │   │   │   └── admin-routes.tsx
│   │   │   ├── attributes
│   │   │   │   ├── attribute-selector
│   │   │   │   │   ├── attribute-selector-extra-items-context.ts
│   │   │   │   │   ├── attribute-selector-item.ts
│   │   │   │   │   ├── attribute-selector.tsx
│   │   │   │   │   ├── create-custom-attribute-dialog.tsx
│   │   │   │   │   ├── replace-variables.ts
│   │   │   │   │   └── use-attribute-selector-items.ts
│   │   │   │   ├── crupdate
│   │   │   │   │   ├── attributes
│   │   │   │   │   │   ├── category-attribute-options-editor.tsx
│   │   │   │   │   │   ├── format-field.tsx
│   │   │   │   │   │   ├── options-editor.tsx
│   │   │   │   │   │   └── permission-field.tsx
│   │   │   │   │   ├── create-attribute-page.tsx
│   │   │   │   │   ├── crupdate-attribute-form.tsx
│   │   │   │   │   ├── update-attribute-page.tsx
│   │   │   │   │   └── use-update-attribute.ts
│   │   │   │   ├── datatable
│   │   │   │   │   ├── attributes-datatable-columns.tsx
│   │   │   │   │   ├── attributes-datatable-filters.tsx
│   │   │   │   │   ├── attributes-datatable-page.tsx
│   │   │   │   │   ├── datatable-attribute.ts
│   │   │   │   │   └── text-field.svg
│   │   │   │   ├── rendering
│   │   │   │   │   ├── attribute-input-renderer.tsx
│   │   │   │   │   ├── attribute-renderer.tsx
│   │   │   │   │   ├── attributes-manager.tsx
│   │   │   │   │   ├── edit-conversation-attributes-dialog.tsx
│   │   │   │   │   ├── make-datatable-filters-from-attributes.ts
│   │   │   │   │   └── pretty-attribute-type.tsx
│   │   │   │   ├── utils
│   │   │   │   │   ├── get-default-values-for-form-with-attributes.ts
│   │   │   │   │   ├── get-operators-for-attribute.ts
│   │   │   │   │   └── validate-attributes-search.ts
│   │   │   │   └── compact-attribute.ts
│   │   │   ├── auth
│   │   │   │   ├── app-account-settings-page.tsx
│   │   │   │   ├── app-login-page.tsx
│   │   │   │   ├── app-register-page.tsx
│   │   │   │   └── auth-dropdown-icons.ts
│   │   │   ├── canned-replies
│   │   │   │   ├── datatable
│   │   │   │   │   ├── canned-replies-datatable-columns.tsx
│   │   │   │   │   ├── canned-replies-datatable-filters.ts
│   │   │   │   │   ├── canned-replies-datatable-page.tsx
│   │   │   │   │   ├── create-canned-reply-dialog.tsx
│   │   │   │   │   ├── create-canned-reply-page.tsx
│   │   │   │   │   ├── crupdate-canned-reply-form-fields.tsx
│   │   │   │   │   ├── update-canned-reply-page.tsx
│   │   │   │   │   └── validate-canned-replies-index-search.ts
│   │   │   │   ├── requests
│   │   │   │   │   ├── use-canned-replies.ts
│   │   │   │   │   ├── use-create-canned-reply.tsx
│   │   │   │   │   ├── use-delete-canned-replies.ts
│   │   │   │   │   └── use-update-canned-reply.ts
│   │   │   │   ├── canned-replies-routes.tsx
│   │   │   │   └── canned-reply.ts
│   │   │   ├── dashboard
│   │   │   │   ├── agents
│   │   │   │   │   ├── agent-index-page
│   │   │   │   │   │   ├── agents-index-page.tsx
│   │   │   │   │   │   ├── agents-table-item.ts
│   │   │   │   │   │   └── team-index-page-tabs.tsx
│   │   │   │   │   ├── edit-agent-page
│   │   │   │   │   │   ├── tabs
│   │   │   │   │   │   ├── after-login-status-section.tsx
│   │   │   │   │   │   ├── edit-agent-page.tsx
│   │   │   │   │   │   └── use-update-agent.ts
│   │   │   │   │   ├── invites
│   │   │   │   │   │   ├── requests
│   │   │   │   │   │   ├── agent-invite.ts
│   │   │   │   │   │   ├── agent-invites-index-page.tsx
│   │   │   │   │   │   └── invite-agents-dialog.tsx
│   │   │   │   │   ├── use-agent-permissions.ts
│   │   │   │   │   └── use-compact-agents.ts
│   │   │   │   ├── contacts
│   │   │   │   │   ├── customer-profile-page
│   │   │   │   │   │   ├── conversations-table.tsx
│   │   │   │   │   │   ├── customer-profile-page.tsx
│   │   │   │   │   │   ├── customer-profile.ts
│   │   │   │   │   │   ├── details-sidebar.tsx
│   │   │   │   │   │   └── merge-users-dialog.tsx
│   │   │   │   │   ├── customers-datatable
│   │   │   │   │   │   ├── customers-datatable-columns.tsx
│   │   │   │   │   │   ├── customers-datatable-filters.ts
│   │   │   │   │   │   ├── customers-datatable-item.ts
│   │   │   │   │   │   ├── customers-datatable-page.tsx
│   │   │   │   │   │   └── validate-customers-search.ts
│   │   │   │   │   ├── customers-routes.tsx
│   │   │   │   │   └── use-is-customer-online.ts
│   │   │   │   ├── conversations
│   │   │   │   │   ├── agent-reply-composer
│   │   │   │   │   │   ├── action-menu-dialog.tsx
│   │   │   │   │   │   ├── after-reply-action.tsx
│   │   │   │   │   │   ├── agent-reply-composer-store.tsx
│   │   │   │   │   │   ├── agent-reply-composer.tsx
│   │   │   │   │   │   ├── article-search-button.tsx
│   │   │   │   │   │   ├── insert-canned-reply-button.tsx
│   │   │   │   │   │   ├── message-type-selector.tsx
│   │   │   │   │   │   ├── placeholder-message.ts
│   │   │   │   │   │   ├── submit-reply-buttons.tsx
│   │   │   │   │   │   └── use-submit-agent-reply.ts
│   │   │   │   │   ├── avatars
│   │   │   │   │   │   ├── agent-avatar.tsx
│   │   │   │   │   │   ├── ai-agent-avatar.tsx
│   │   │   │   │   │   ├── customer-avatar.tsx
│   │   │   │   │   │   └── system-avatar.tsx
│   │   │   │   │   ├── conversation-page
│   │   │   │   │   │   ├── details-sidebar
│   │   │   │   │   │   ├── messages
│   │   │   │   │   │   ├── requests
│   │   │   │   │   │   ├── toolbar
│   │   │   │   │   │   ├── transfer-conversation-dialog
│   │   │   │   │   │   ├── change-customer-dialog.tsx
│   │   │   │   │   │   ├── conversation-list-skeleton.tsx
│   │   │   │   │   │   ├── conversation-page.tsx
│   │   │   │   │   │   ├── conversations-list-sidebar.tsx
│   │   │   │   │   │   └── use-agent-inbox-layout.tsx
│   │   │   │   │   ├── conversations-list
│   │   │   │   │   │   └── conversations-list-item.tsx
│   │   │   │   │   ├── conversations-table
│   │   │   │   │   │   ├── columns
│   │   │   │   │   │   ├── conversation-actions
│   │   │   │   │   │   ├── conversations-table-actions.tsx
│   │   │   │   │   │   ├── conversations-table-filters.tsx
│   │   │   │   │   │   ├── conversations-table-page.tsx
│   │   │   │   │   │   ├── converstions-table-available-columns.ts
│   │   │   │   │   │   ├── generic-conversations-table.tsx
│   │   │   │   │   │   ├── native-conversations-table.tsx
│   │   │   │   │   │   └── opened.svg
│   │   │   │   │   ├── new-conversation-page
│   │   │   │   │   │   ├── message-field.tsx
│   │   │   │   │   │   ├── new-conversation-form.tsx
│   │   │   │   │   │   ├── new-conversation-page.tsx
│   │   │   │   │   │   └── new-conversation-payload.ts
│   │   │   │   │   ├── utils
│   │   │   │   │   │   ├── get-conversation-page-link.ts
│   │   │   │   │   │   ├── get-status-color.tsx
│   │   │   │   │   │   ├── reverse-conversation-messages.ts
│   │   │   │   │   │   ├── use-active-view-converstions.ts
│   │   │   │   │   │   ├── use-active-view-name.tsx
│   │   │   │   │   │   └── use-navigate-to-conversation-page.ts
│   │   │   │   │   ├── agent-conversations-search-schema.ts
│   │   │   │   │   ├── conversation-list-layout-toggle.tsx
│   │   │   │   │   ├── conversation-preview-dialog.tsx
│   │   │   │   │   ├── conversations-search-page.tsx
│   │   │   │   │   └── customer-name.tsx
│   │   │   │   ├── dashboard-layout
│   │   │   │   │   ├── helpdesk-dashboard-layout.tsx
│   │   │   │   │   ├── helpdesk-dashboard-sidebar.tsx
│   │   │   │   │   ├── inbox-column-layout.tsx
│   │   │   │   │   ├── inbox-section-header.tsx
│   │   │   │   │   └── mobile-bottom-navbar.tsx
│   │   │   │   ├── groups
│   │   │   │   │   ├── crupdate-group-form
│   │   │   │   │   │   ├── crupdate-group-form-content.tsx
│   │   │   │   │   │   ├── crupdate-group-members-table.tsx
│   │   │   │   │   │   └── crupdate-group-section-header.tsx
│   │   │   │   │   ├── groups-index-page
│   │   │   │   │   │   ├── groups-index-page.tsx
│   │   │   │   │   │   └── groups-table-item.ts
│   │   │   │   │   ├── requests
│   │   │   │   │   │   ├── use-create-group.ts
│   │   │   │   │   │   ├── use-delete-group.ts
│   │   │   │   │   │   └── use-update-group.ts
│   │   │   │   │   ├── create-group-page.tsx
│   │   │   │   │   ├── delete-group-dialog.tsx
│   │   │   │   │   ├── edit-group-page.tsx
│   │   │   │   │   └── group.ts
│   │   │   │   ├── inbox
│   │   │   │   │   ├── inbox-views-panel.tsx
│   │   │   │   │   └── inbox-views-sidebar.tsx
│   │   │   │   ├── reports
│   │   │   │   │   ├── layout
│   │   │   │   │   │   ├── report-layout.tsx
│   │   │   │   │   │   └── use-date-range.ts
│   │   │   │   │   ├── team
│   │   │   │   │   │   ├── teammate-performance-report-page.tsx
│   │   │   │   │   │   └── teammate-performance-table.tsx
│   │   │   │   │   ├── types
│   │   │   │   │   │   ├── conversations-report.ts
│   │   │   │   │   │   └── tags-report-dataset-item.ts
│   │   │   │   │   ├── articles-report-page.tsx
│   │   │   │   │   ├── conversations-overview-report-page.tsx
│   │   │   │   │   ├── envato-report-page.tsx
│   │   │   │   │   ├── google-analytics-report-page.tsx
│   │   │   │   │   ├── helpdesk-reports-routes.tsx
│   │   │   │   │   ├── search-report-page.tsx
│   │   │   │   │   └── tags-report-page.tsx
│   │   │   │   ├── statuses
│   │   │   │   │   ├── crupdate
│   │   │   │   │   │   ├── create-status-dialog.tsx
│   │   │   │   │   │   ├── crupdate-status-fields.tsx
│   │   │   │   │   │   ├── delete-status-dialog.tsx
│   │   │   │   │   │   ├── update-status-dialog.tsx
│   │   │   │   │   │   └── use-update-status.ts
│   │   │   │   │   ├── datatable
│   │   │   │   │   │   ├── statuses-datatable-columns.tsx
│   │   │   │   │   │   └── statuses-datatable-page.tsx
│   │   │   │   │   ├── status-category.tsx
│   │   │   │   │   ├── status.ts
│   │   │   │   │   └── statuses-routes.tsx
│   │   │   │   ├── types
│   │   │   │   │   ├── agent-canned-reply.ts
│   │   │   │   │   ├── agent.ts
│   │   │   │   │   ├── campaign-template.ts
│   │   │   │   │   ├── conversation-article-search-result.ts
│   │   │   │   │   ├── conversation-attachment.ts
│   │   │   │   │   ├── statuses.ts
│   │   │   │   │   └── views.ts
│   │   │   │   ├── views
│   │   │   │   │   ├── form
│   │   │   │   │   │   ├── columns-editor.tsx
│   │   │   │   │   │   ├── conditions-editor.tsx
│   │   │   │   │   │   ├── crupdate-view-form.tsx
│   │   │   │   │   │   ├── icon-selector.tsx
│   │   │   │   │   │   └── section-header.tsx
│   │   │   │   │   ├── create-view-page.tsx
│   │   │   │   │   ├── edit-view-page.tsx
│   │   │   │   │   ├── use-update-view.ts
│   │   │   │   │   ├── view.ts
│   │   │   │   │   ├── views-datatable-page.tsx
│   │   │   │   │   └── views-routes.tsx
│   │   │   │   ├── websockets
│   │   │   │   │   ├── boot-echo.ts
│   │   │   │   │   ├── dashboard-websocket-updates-notifier.ts
│   │   │   │   │   ├── echo-store.ts
│   │   │   │   │   ├── play-conversation-sound.ts
│   │   │   │   │   ├── unseen-messages-badge.tsx
│   │   │   │   │   ├── use-dashboard-websocket-listener.ts
│   │   │   │   │   ├── websocket-conversation-event.ts
│   │   │   │   │   └── websocket-updates-notifier.ts
│   │   │   │   ├── agent-notification-settings-page.tsx
│   │   │   │   ├── agent-page-layout.tsx
│   │   │   │   ├── conversation-attachment-list-layout.tsx
│   │   │   │   ├── conversation.ts
│   │   │   │   ├── dashboard-icons.tsx
│   │   │   │   ├── dashboard-routes.tsx
│   │   │   │   ├── helpdesk-channel.ts
│   │   │   │   ├── helpdesk-queries.ts
│   │   │   │   ├── team-routes.tsx
│   │   │   │   └── use-is-agent.ts
│   │   │   ├── help-center
│   │   │   │   ├── articles
│   │   │   │   │   ├── article-datatable
│   │   │   │   │   │   ├── article-datatable-columns.tsx
│   │   │   │   │   │   ├── article-datatable-filters.ts
│   │   │   │   │   │   ├── article-datatable-item.ts
│   │   │   │   │   │   ├── article-datatable-page.tsx
│   │   │   │   │   │   ├── online-articles.svg
│   │   │   │   │   │   └── use-perform-batch-action.ts
│   │   │   │   │   ├── article-editor
│   │   │   │   │   │   ├── article-attachments-editor.tsx
│   │   │   │   │   │   ├── article-author-field.tsx
│   │   │   │   │   │   ├── article-editor-aside.tsx
│   │   │   │   │   │   ├── article-section-selector.tsx
│   │   │   │   │   │   ├── create-article-page.tsx
│   │   │   │   │   │   ├── hc-article-editor-breadcrumb.tsx
│   │   │   │   │   │   ├── toggle-published-button.tsx
│   │   │   │   │   │   ├── update-article-page-data.ts
│   │   │   │   │   │   └── update-article-page.tsx
│   │   │   │   │   ├── article-page
│   │   │   │   │   │   ├── article-page-breadcrumb.tsx
│   │   │   │   │   │   ├── article-page-data.ts
│   │   │   │   │   │   ├── article-page-feedback.tsx
│   │   │   │   │   │   ├── article-page-layout.tsx
│   │   │   │   │   │   ├── article-page.tsx
│   │   │   │   │   │   └── use-submit-article-feedback.ts
│   │   │   │   │   ├── requests
│   │   │   │   │   │   ├── use-create-article.ts
│   │   │   │   │   │   ├── use-delete-articles.ts
│   │   │   │   │   │   ├── use-ingest-articles.ts
│   │   │   │   │   │   ├── use-uningest-articles.ts
│   │   │   │   │   │   └── use-update-article.ts
│   │   │   │   │   ├── article-attachments.tsx
│   │   │   │   │   ├── article-link.tsx
│   │   │   │   │   ├── article-path-item.ts
│   │   │   │   │   ├── article-path.tsx
│   │   │   │   │   └── hc-sidenav.tsx
│   │   │   │   ├── categories
│   │   │   │   │   ├── category-link.tsx
│   │   │   │   │   ├── category-page-data.ts
│   │   │   │   │   └── category-page.tsx
│   │   │   │   ├── homepage
│   │   │   │   │   ├── article-grid.tsx
│   │   │   │   │   ├── category-grid.tsx
│   │   │   │   │   ├── colorful-header.tsx
│   │   │   │   │   ├── hc-landing-page-data.ts
│   │   │   │   │   ├── hc-landing-page.tsx
│   │   │   │   │   ├── landing-page-pattern.tsx
│   │   │   │   │   ├── multi-product-article-grid.tsx
│   │   │   │   │   ├── simple-header.tsx
│   │   │   │   │   └── use-landing-page-header-background.ts
│   │   │   │   ├── manager
│   │   │   │   │   ├── crupdate-category-dialog
│   │   │   │   │   │   ├── create-category-dialog.tsx
│   │   │   │   │   │   ├── crupdate-category-form.tsx
│   │   │   │   │   │   ├── update-category-dialog.tsx
│   │   │   │   │   │   ├── use-create-category.ts
│   │   │   │   │   │   └── use-update-category.ts
│   │   │   │   │   ├── layout
│   │   │   │   │   │   ├── hc-manager-breadcrumb.tsx
│   │   │   │   │   │   ├── hc-manager-empty-message.tsx
│   │   │   │   │   │   ├── hc-manager-layout.tsx
│   │   │   │   │   │   ├── hc-manager-row.tsx
│   │   │   │   │   │   └── hc-manager-title.tsx
│   │   │   │   │   ├── requests
│   │   │   │   │   │   ├── use-delete-category.ts
│   │   │   │   │   │   ├── use-reorder-articles.ts
│   │   │   │   │   │   └── use-reorder-categories.ts
│   │   │   │   │   ├── article-row.tsx
│   │   │   │   │   ├── hc-article-manager.tsx
│   │   │   │   │   ├── hc-category-manager.tsx
│   │   │   │   │   ├── hc-manager-data.ts
│   │   │   │   │   └── hc-manager-routes.tsx
│   │   │   │   ├── search
│   │   │   │   │   ├── hc-search-bar.tsx
│   │   │   │   │   ├── hc-search-page.tsx
│   │   │   │   │   ├── search-articles-response.ts
│   │   │   │   │   ├── search-term.ts
│   │   │   │   │   ├── search-trigger-button.tsx
│   │   │   │   │   ├── search.svg
│   │   │   │   │   ├── use-search-term-logger.ts
│   │   │   │   │   └── validate-article-search-params.ts
│   │   │   │   ├── tickets-portal
│   │   │   │   │   ├── new-ticket-page
│   │   │   │   │   │   ├── form
│   │   │   │   │   │   ├── create-ticket-as-customer-payload.ts
│   │   │   │   │   │   ├── customer-new-ticket-page-data.ts
│   │   │   │   │   │   ├── new-ticket-page.tsx
│   │   │   │   │   │   └── suggested-articles-drawer.tsx
│   │   │   │   │   ├── ticket-page
│   │   │   │   │   │   ├── conversation-response.ts
│   │   │   │   │   │   ├── customer-ticket-page-layout.css
│   │   │   │   │   │   ├── reply-list.tsx
│   │   │   │   │   │   ├── ticket-details.tsx
│   │   │   │   │   │   └── ticket-page.tsx
│   │   │   │   │   └── ticklets-table
│   │   │   │   │       ├── tickets-table-columns.tsx
│   │   │   │   │       ├── tickets-table-page.tsx
│   │   │   │   │       └── tickets-table-schema.ts
│   │   │   │   ├── hc-category-icons.tsx
│   │   │   │   ├── help-center-queries.ts
│   │   │   │   ├── help-center-routes.tsx
│   │   │   │   ├── help-center.css
│   │   │   │   ├── managed-by-field.tsx
│   │   │   │   ├── role-selector.tsx
│   │   │   │   └── visible-to-field.tsx
│   │   │   ├── reply-composer
│   │   │   │   ├── emoji-picker-button.tsx
│   │   │   │   ├── enhance-text-with-ai-button.tsx
│   │   │   │   ├── insert-inline-image-button.tsx
│   │   │   │   ├── reply-composer-attachments.tsx
│   │   │   │   ├── reply-composer-container.tsx
│   │   │   │   ├── reply-composer-drop-target.tsx
│   │   │   │   ├── reply-composer-footer.tsx
│   │   │   │   ├── upload-attachments-button.tsx
│   │   │   │   ├── use-upload-attachments.ts
│   │   │   │   └── variable-extension.tsx
│   │   │   ├── triggers
│   │   │   │   ├── form
│   │   │   │   │   ├── crupdate-trigger-form.tsx
│   │   │   │   │   ├── trigger-action-fields.tsx
│   │   │   │   │   ├── trigger-condition-fields.tsx
│   │   │   │   │   └── trigger-section-header.tsx
│   │   │   │   ├── requests
│   │   │   │   │   ├── trigger-config.ts
│   │   │   │   │   ├── use-create-trigger.ts
│   │   │   │   │   └── use-update-trigger.ts
│   │   │   │   ├── create-trigger-page.tsx
│   │   │   │   ├── software-engineer.svg
│   │   │   │   ├── trigger.ts
│   │   │   │   ├── triggers-datatable-page.tsx
│   │   │   │   └── update-trigger-page.tsx
│   │   │   ├── app-router.tsx
│   │   │   ├── app.css
│   │   │   ├── main.tsx
│   │   │   ├── site-config.tsx
│   │   │   ├── use-is-module-installed.ts
│   │   │   └── vite-env.d.ts
│   │   ├── defaults
│   │   │   ├── default-settings.php
│   │   │   ├── menu-editor-config.php
│   │   │   ├── notification-settings.php
│   │   │   └── permissions.php
│   │   ├── demo
│   │   │   ├── chats
│   │   │   │   ├── chat-1.json
│   │   │   │   ├── chat-2.json
│   │   │   │   ├── chat-3.json
│   │   │   │   ├── chat-4.json
│   │   │   │   └── chat-5.json
│   │   │   ├── tickets
│   │   │   │   ├── content
│   │   │   │   │   ├── ticket-1.json
│   │   │   │   │   ├── ticket-2.json
│   │   │   │   │   ├── ticket-3.json
│   │   │   │   │   ├── ticket-4.json
│   │   │   │   │   └── ticket-5.json
│   │   │   │   └── subjects.json
│   │   │   ├── canned-replies.json
│   │   │   ├── demo-article-body.html
│   │   │   ├── demo-categories.json
│   │   │   ├── demo-search-terms.json
│   │   │   ├── emails.json
│   │   │   └── names.php
│   │   ├── lang
│   │   │   └── en
│   │   │       ├── auth.php
│   │   │       ├── passwords.php
│   │   │       └── validation.php
│   │   ├── views
│   │   │   ├── errors
│   │   │   │   └── 503.blade.php
│   │   │   ├── seo
│   │   │   │   ├── article-page
│   │   │   │   │   ├── prerender.blade.php
│   │   │   │   │   └── seo-tags.blade.php
│   │   │   │   ├── category-page
│   │   │   │   │   ├── prerender.blade.php
│   │   │   │   │   └── seo-tags.blade.php
│   │   │   │   ├── custom-page
│   │   │   │   │   ├── prerender.blade.php
│   │   │   │   │   └── seo-tags.blade.php
│   │   │   │   ├── hc-landing-page
│   │   │   │   │   ├── prerender.blade.php
│   │   │   │   │   └── seo-tags.blade.php
│   │   │   │   └── hc-search-page
│   │   │   │       ├── prerender.blade.php
│   │   │   │       └── seo-tags.blade.php
│   │   │   ├── tickets
│   │   │   │   ├── layout
│   │   │   │   │   └── ticket-with-reference.blade.php
│   │   │   │   ├── request-received
│   │   │   │   │   ├── request-received-plain.blade.php
│   │   │   │   │   └── request-received.blade.php
│   │   │   │   ├── ticket-reply
│   │   │   │   │   ├── ticket-reply-plain.blade.php
│   │   │   │   │   └── ticket-reply.blade.php
│   │   │   │   ├── clean-email-body-prompt.blade.php
│   │   │   │   └── failed-email-ticket-body.blade.php
│   │   │   └── app.blade.php
│   │   ├── client-translations.json
│   │   └── server-translations.json
│   ├── routes
│   │   ├── api.php
│   │   ├── channels.php
│   │   ├── console.php
│   │   └── web.php
│   ├── storage
│   │   ├── app
│   │   │   ├── chunks
│   │   │   │   └── .gitignore
│   │   │   ├── editable-views
│   │   │   │   └── .gitignore
│   │   │   ├── emails
│   │   │   │   ├── matched
│   │   │   │   │   └── .gitignore
│   │   │   │   └── unmatched
│   │   │   │       └── .gitignore
│   │   │   ├── public
│   │   │   │   ├── .gitignore
│   │   │   ├── purifier
│   │   │   │   └── .gitignore
│   │   │   ├── .gitignore
│   │   │   └── geoip.mmdb
│   │   ├── clockwork
│   │   │   └── .gitignore
│   │   ├── framework
│   │   │   ├── cache
│   │   │   │   └── .gitignore
│   │   │   ├── sessions
│   │   │   │   └── .gitignore
│   │   │   ├── testing
│   │   │   │   └── .gitignore
│   │   │   ├── views
│   │   │   │   └── .gitignore
│   │   │   └── .gitignore
│   │   ├── laravel-analytics
│   │   │   └── .gitignore
│   │   ├── pail
│   │   │   └── .gitignore
│   │   ├── tntsearch
│   │   │   └── .gitignore
│   │   └── tus
│   │       └── a0f647fe-8b21-4f83-b071-675068a00d4b
│   ├── tests
│   │   ├── Feature
│   │   │   └── ExampleTest.php
│   │   ├── Unit
│   │   │   └── ExampleTest.php
│   │   ├── CreatesApplication.php
│   │   └── TestCase.php
│   ├── .editorconfig
│   ├── .gitignore
│   ├── .prettierrc.yaml
│   ├── 400_error_dump.html
│   ├── artisan
│   ├── changelog.html
│   ├── codecanyon-lAR5jaYO-bedesk-customer-support-software-helpdesk-ticketing-system.zip
│   ├── composer.json
│   ├── composer.lock
│   ├── documentation.html
│   ├── eslint.config.js
│   ├── htaccess.example
│   ├── index.php
│   ├── package-lock.json
│   ├── package.json
│   ├── pipe.php
│   ├── postcss.config.js
│   ├── rector.php
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── public
│   ├── images
│   │   ├── avatar
│   │   │   └── avatar.png
│   │   ├── logos
│   │   │   ├── favicon.png
│   │   │   ├── image.png
│   │   │   ├── logo-dark.png
│   │   │   ├── logo-light.png
│   │   │   ├── ribo-light.png
│   │   │   └── ribo-logo.png
│   │   ├── default-product.svg
│   │   ├── onboarding.png
│   │   └── onboarding2.png
│   ├── installer
│   │   ├── css
│   │   │   ├── sass
│   │   │   │   ├── _variables.sass
│   │   │   │   └── style.sass
│   │   │   ├── scss
│   │   │   │   ├── font-awesome
│   │   │   │   │   ├── _animated.scss
│   │   │   │   │   ├── _bordered-pulled.scss
│   │   │   │   │   ├── _core.scss
│   │   │   │   │   ├── _fixed-width.scss
│   │   │   │   │   ├── _icons.scss
│   │   │   │   │   ├── _larger.scss
│   │   │   │   │   ├── _list.scss
│   │   │   │   │   ├── _mixins.scss
│   │   │   │   │   ├── _path.scss
│   │   │   │   │   ├── _rotated-flipped.scss
│   │   │   │   │   ├── _screen-reader.scss
│   │   │   │   │   ├── _stacked.scss
│   │   │   │   │   ├── _variables.scss
│   │   │   │   │   └── font-awesome.scss
│   │   │   │   ├── _variables.scss
│   │   │   │   └── style.scss
│   │   │   ├── style.css
│   │   │   ├── style.css.map
│   │   │   ├── style.min.css
│   │   │   └── style.min.css.map
│   │   ├── fonts
│   │   │   ├── fontawesome-webfont.eot
│   │   │   ├── fontawesome-webfont.svg
│   │   │   ├── fontawesome-webfont.ttf
│   │   │   ├── fontawesome-webfont.woff
│   │   │   ├── fontawesome-webfont.woff2
│   │   │   ├── FontAwesome.otf
│   │   │   ├── ionicons.eot
│   │   │   ├── ionicons.svg
│   │   │   ├── ionicons.ttf
│   │   │   └── ionicons.woff
│   │   └── img
│   │       ├── favicon
│   │       │   ├── favicon-16x16.png
│   │       │   ├── favicon-32x32.png
│   │       │   └── favicon-96x96.png
│   │       ├── background.png
│   │       └── pattern.png
│   ├── js
│   │   └── jquery.min.js
│   ├── build (2).zip
│   ├── build (3).zip
│   ├── build.zip
│   ├── index.php
│   ├── logo.svg
│   └── robots.txt
├── resources
│   ├── css
│   │   ├── app.css
│   │   ├── cashfree-modal-fix.css
│   │   ├── dark-mode.css
│   │   ├── dashboard-responsive.css
│   │   ├── invoice-print.css
│   │   ├── iyzipay-styles.css
│   │   ├── rtl.css
│   │   ├── template-animations.css
│   │   └── template-preview.css
│   ├── js
│   │   ├── components
│   │   │   ├── ActivityStream
│   │   │   │   ├── ActivityItem.tsx
│   │   │   │   └── ActivityStream.tsx
│   │   │   ├── auth
│   │   │   │   └── auth-button.tsx
│   │   │   ├── chatgpt
│   │   │   │   ├── ChatGptButton.tsx
│   │   │   │   ├── ChatGptField.tsx
│   │   │   │   ├── ChatGptModal.tsx
│   │   │   │   └── index.ts
│   │   │   ├── dashboard
│   │   │   │   ├── dashboard-overview.tsx
│   │   │   │   └── index.ts
│   │   │   ├── kanban
│   │   │   │   ├── CommonKanbanBoard.tsx
│   │   │   │   ├── index.ts
│   │   │   │   ├── KanbanBoard.tsx
│   │   │   │   ├── KanbanCard.tsx
│   │   │   │   ├── KanbanColumn.tsx
│   │   │   │   ├── OpportunityKanbanBoard.tsx
│   │   │   │   └── ProjectTaskKanbanBoard.tsx
│   │   │   ├── payment
│   │   │   │   ├── aamarpay-payment-form.tsx
│   │   │   │   ├── authorizenet-payment-form.tsx
│   │   │   │   ├── bank-transfer-form.tsx
│   │   │   │   ├── benefit-payment-form.tsx
│   │   │   │   ├── cashfree-payment-form.tsx
│   │   │   │   ├── cinetpay-payment-form.tsx
│   │   │   │   ├── coingate-payment-form.tsx
│   │   │   │   ├── easebuzz-payment-form.tsx
│   │   │   │   ├── fedapay-payment-form.tsx
│   │   │   │   ├── flutterwave-payment-form.tsx
│   │   │   │   ├── hitpay-payment-form.tsx
│   │   │   │   ├── invoice-aamarpay-payment-form.tsx
│   │   │   │   ├── invoice-authorizenet-payment-form.tsx
│   │   │   │   ├── invoice-bank-transfer-form.tsx
│   │   │   │   ├── invoice-benefit-payment-form.tsx
│   │   │   │   ├── invoice-cashfree-payment-form.tsx
│   │   │   │   ├── invoice-cinetpay-payment-form.tsx
│   │   │   │   ├── invoice-coingate-payment-form.tsx
│   │   │   │   ├── invoice-easebuzz-payment-form.tsx
│   │   │   │   ├── invoice-fedapay-payment-form.tsx
│   │   │   │   ├── invoice-flutterwave-payment-form.tsx
│   │   │   │   ├── invoice-hitpay-payment-form.tsx
│   │   │   │   ├── invoice-iyzipay-payment-form.tsx
│   │   │   │   ├── invoice-khalti-payment-form.tsx
│   │   │   │   ├── invoice-mercadopago-payment-form.tsx
│   │   │   │   ├── invoice-midtrans-payment-form.tsx
│   │   │   │   ├── invoice-mollie-payment-form.tsx
│   │   │   │   ├── invoice-ozow-payment-form.tsx
│   │   │   │   ├── invoice-paiement-payment-form.tsx
│   │   │   │   ├── invoice-payfast-payment-form.tsx
│   │   │   │   ├── invoice-payhere-payment-form.tsx
│   │   │   │   ├── invoice-payment-processor.tsx
│   │   │   │   ├── invoice-paymentwall-payment-form.tsx
│   │   │   │   ├── invoice-paypal-payment-form.tsx
│   │   │   │   ├── invoice-paystack-payment-form.tsx
│   │   │   │   ├── invoice-paytabs-payment-form.tsx
│   │   │   │   ├── invoice-paytr-payment-form.tsx
│   │   │   │   ├── invoice-razorpay-payment-form.tsx
│   │   │   │   ├── invoice-skrill-payment-form.tsx
│   │   │   │   ├── invoice-sspay-payment-form.tsx
│   │   │   │   ├── invoice-tap-payment-form.tsx
│   │   │   │   ├── invoice-toyyibpay-payment-form.tsx
│   │   │   │   ├── invoice-xendit-payment-form.tsx
│   │   │   │   ├── invoice-yookassa-payment-form.tsx
│   │   │   │   ├── iyzipay-payment-form.tsx
│   │   │   │   ├── khalti-payment-form.tsx
│   │   │   │   ├── mercadopago-payment-form.tsx
│   │   │   │   ├── midtrans-payment-form.tsx
│   │   │   │   ├── mollie-payment-form.tsx
│   │   │   │   ├── nepalste-payment-form.tsx
│   │   │   │   ├── ozow-payment-form.tsx
│   │   │   │   ├── paiement-payment-form.tsx
│   │   │   │   ├── payfast-payment-form.tsx
│   │   │   │   ├── payhere-payment-form.tsx
│   │   │   │   ├── payment-form-wrapper.tsx
│   │   │   │   ├── payment-input-field.tsx
│   │   │   │   ├── payment-method-card.tsx
│   │   │   │   ├── payment-mode-selector.tsx
│   │   │   │   ├── payment-processor.tsx
│   │   │   │   ├── paymentwall-payment-form.tsx
│   │   │   │   ├── paypal-payment-form.tsx
│   │   │   │   ├── paystack-payment-form.tsx
│   │   │   │   ├── paytabs-payment-form.tsx
│   │   │   │   ├── paytr-payment-form.tsx
│   │   │   │   ├── razorpay-payment-form.tsx
│   │   │   │   ├── skrill-payment-form.tsx
│   │   │   │   ├── sspay-payment-form.tsx
│   │   │   │   ├── stripe-payment-form.tsx
│   │   │   │   ├── tap-payment-form.tsx
│   │   │   │   ├── toyyibpay-payment-form.tsx
│   │   │   │   ├── xendit-payment-form.tsx
│   │   │   │   └── yookassa-payment-form.tsx
│   │   │   ├── reports
│   │   │   │   ├── chart-card.tsx
│   │   │   │   ├── report-filters.tsx
│   │   │   │   └── summary-cards.tsx
│   │   │   ├── ui
│   │   │   │   ├── alert.tsx
│   │   │   │   ├── avatar.tsx
│   │   │   │   ├── badge.tsx
│   │   │   │   ├── breadcrumb.tsx
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── checkbox.tsx
│   │   │   │   ├── collapsible.tsx
│   │   │   │   ├── custom-textarea.tsx
│   │   │   │   ├── date-picker.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   ├── dropdown-menu.tsx
│   │   │   │   ├── icon.tsx
│   │   │   │   ├── indeterminate-checkbox.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── label.tsx
│   │   │   │   ├── navigation-menu.tsx
│   │   │   │   ├── optimized-image.tsx
│   │   │   │   ├── pagination.tsx
│   │   │   │   ├── placeholder-pattern.tsx
│   │   │   │   ├── popover.tsx
│   │   │   │   ├── progress.tsx
│   │   │   │   ├── radio-group.tsx
│   │   │   │   ├── repeater.tsx
│   │   │   │   ├── rich-text-editor.tsx
│   │   │   │   ├── rich-text-field.tsx
│   │   │   │   ├── scroll-area.tsx
│   │   │   │   ├── search-and-filter-bar.tsx
│   │   │   │   ├── select.tsx
│   │   │   │   ├── separator.tsx
│   │   │   │   ├── sheet.tsx
│   │   │   │   ├── sidebar.tsx
│   │   │   │   ├── skeleton.tsx
│   │   │   │   ├── sonner.tsx
│   │   │   │   ├── switch.tsx
│   │   │   │   ├── table.tsx
│   │   │   │   ├── tabs.tsx
│   │   │   │   ├── textarea.tsx
│   │   │   │   ├── toast-notification.tsx
│   │   │   │   ├── toaster.tsx
│   │   │   │   ├── toggle-group.tsx
│   │   │   │   ├── toggle.tsx
│   │   │   │   └── tooltip.tsx
│   │   │   ├── app-content.tsx
│   │   │   ├── app-header.tsx
│   │   │   ├── app-logo-icon.tsx
│   │   │   ├── app-logo.tsx
│   │   │   ├── app-shell.tsx
│   │   │   ├── app-sidebar-header.tsx
│   │   │   ├── app-sidebar.tsx
│   │   │   ├── appearance-dropdown.tsx
│   │   │   ├── appearance-tabs.tsx
│   │   │   ├── Barcode.tsx
│   │   │   ├── breadcrumbs.tsx
│   │   │   ├── ChatWidgetToggle.tsx
│   │   │   ├── ColumnMappingModal.tsx
│   │   │   ├── ContactFormModal.tsx
│   │   │   ├── CookieConsentBanner.tsx
│   │   │   ├── create-language-modal.tsx
│   │   │   ├── CrudColumnRenderers.tsx
│   │   │   ├── CrudDeleteModal.tsx
│   │   │   ├── CrudFormModal.tsx
│   │   │   ├── CrudTable.tsx
│   │   │   ├── custom-toast.tsx
│   │   │   ├── delete-user.tsx
│   │   │   ├── demo-mode-banner.tsx
│   │   │   ├── DomainConfig.tsx
│   │   │   ├── error-boundary.tsx
│   │   │   ├── FloatingChatGpt.tsx
│   │   │   ├── heading-small.tsx
│   │   │   ├── heading.tsx
│   │   │   ├── HelpArticlePanel.tsx
│   │   │   ├── icon.tsx
│   │   │   ├── IframePortal.tsx
│   │   │   ├── ImagePreview.tsx
│   │   │   ├── ImportModal.tsx
│   │   │   ├── input-error.tsx
│   │   │   ├── invoice-payment-modal.tsx
│   │   │   ├── language-switcher.tsx
│   │   │   ├── layout-rtl-settings.tsx
│   │   │   ├── MediaLibraryModal.tsx
│   │   │   ├── MediaPicker.tsx
│   │   │   ├── multi-select-field.tsx
│   │   │   ├── nav-footer.tsx
│   │   │   ├── nav-main.tsx
│   │   │   ├── nav-user.tsx
│   │   │   ├── page-template.tsx
│   │   │   ├── PageCrudWrapper.tsx
│   │   │   ├── PageWrapper.tsx
│   │   │   ├── PermissionBadges.tsx
│   │   │   ├── plan-subscription-modal.tsx
│   │   │   ├── profile-menu.tsx
│   │   │   ├── QRCodeComponent.tsx
│   │   │   ├── recaptcha.tsx
│   │   │   ├── RolePermissionCheckboxGroup.tsx
│   │   │   ├── settings-section.tsx
│   │   │   ├── sidebar-preview.tsx
│   │   │   ├── sidebar-style-settings.tsx
│   │   │   ├── simple-multi-select.tsx
│   │   │   ├── text-link.tsx
│   │   │   ├── theme-preview.tsx
│   │   │   ├── UpgradePlanModal.tsx
│   │   │   ├── user-info.tsx
│   │   │   ├── user-menu-content.tsx
│   │   │   ├── WeddingSupplierCategoryManager.tsx
│   │   │   └── WeddingSupplierFormModal.tsx
│   │   ├── config
│   │   │   └── crud
│   │   │       ├── company-plan-orders.ts
│   │   │       ├── company-plan-requests.ts
│   │   │       ├── contacts.ts
│   │   │       ├── coupons.ts
│   │   │       ├── currencies.ts
│   │   │       ├── permissions.ts
│   │   │       ├── plan-orders.ts
│   │   │       ├── plan-requests.ts
│   │   │       ├── roles.ts
│   │   │       └── users.ts
│   │   ├── contexts
│   │   │   ├── BrandContext.tsx
│   │   │   ├── LayoutContext.tsx
│   │   │   ├── LogoContext.tsx
│   │   │   ├── ModalStackContext.tsx
│   │   │   └── SidebarContext.tsx
│   │   ├── helpers
│   │   │   └── assetHelper.ts
│   │   ├── hooks
│   │   │   ├── use-appearance.tsx
│   │   │   ├── use-axios.ts
│   │   │   ├── use-brand-theme.ts
│   │   │   ├── use-dynamic-title.ts
│   │   │   ├── use-favicon.ts
│   │   │   ├── use-initials.tsx
│   │   │   ├── use-mobile-navigation.ts
│   │   │   ├── use-mobile.tsx
│   │   │   ├── use-theme-preview.tsx
│   │   │   ├── useChatGpt.ts
│   │   │   ├── usePaymentMethods.ts
│   │   │   ├── usePaymentProcessor.ts
│   │   │   ├── usePWAInstall.ts
│   │   │   ├── useScrollAnimation.ts
│   │   │   └── useStackedModal.ts
│   │   ├── layouts
│   │   │   ├── app
│   │   │   │   ├── app-header-layout.tsx
│   │   │   │   └── app-sidebar-layout.tsx
│   │   │   ├── auth
│   │   │   │   ├── auth-card-layout.tsx
│   │   │   │   ├── auth-simple-layout.tsx
│   │   │   │   └── auth-split-layout.tsx
│   │   │   ├── app-layout.tsx
│   │   │   ├── auth-layout.tsx
│   │   │   └── onboarding-layout.tsx
│   │   ├── lib
│   │   │   └── utils.ts
│   │   ├── pages
│   │   │   ├── account-industries
│   │   │   │   └── index.tsx
│   │   │   ├── account-types
│   │   │   │   └── index.tsx
│   │   │   ├── accounts
│   │   │   │   ├── index.tsx
│   │   │   │   └── show.tsx
│   │   │   ├── auth
│   │   │   │   ├── accept-invitation.tsx
│   │   │   │   ├── confirm-password.tsx
│   │   │   │   ├── forgot-password.tsx
│   │   │   │   ├── login.tsx
│   │   │   │   ├── register.tsx
│   │   │   │   ├── reset-password.tsx
│   │   │   │   └── verify-email.tsx
│   │   │   ├── brands
│   │   │   │   └── index.tsx
│   │   │   ├── calendar
│   │   │   │   └── index.tsx
│   │   │   ├── calls
│   │   │   │   ├── index.tsx
│   │   │   │   └── show.tsx
│   │   │   ├── campaign-types
│   │   │   │   └── index.tsx
│   │   │   ├── campaigns
│   │   │   │   ├── index.tsx
│   │   │   │   └── show.tsx
│   │   │   ├── cases
│   │   │   │   ├── index.tsx
│   │   │   │   └── show.tsx
│   │   │   ├── categories
│   │   │   │   └── index.tsx
│   │   │   ├── companies
│   │   │   │   └── index.tsx
│   │   │   ├── company
│   │   │   │   ├── plan-orders
│   │   │   │   │   └── index.tsx
│   │   │   │   └── plan-requests
│   │   │   │       └── index.tsx
│   │   │   ├── contact-messages
│   │   │   │   └── index.tsx
│   │   │   ├── contacts
│   │   │   │   ├── index.tsx
│   │   │   │   └── show.tsx
│   │   │   ├── conversations
│   │   │   │   ├── components
│   │   │   │   │   └── conversations-calendar.tsx
│   │   │   │   └── index.tsx
│   │   │   ├── coupons
│   │   │   │   ├── index.tsx
│   │   │   │   └── show.tsx
│   │   │   ├── currencies
│   │   │   │   └── index.tsx
│   │   │   ├── delivery-orders
│   │   │   │   ├── index.tsx
│   │   │   │   └── show.tsx
│   │   │   ├── document-folders
│   │   │   │   ├── index.tsx
│   │   │   │   └── show.tsx
│   │   │   ├── document-types
│   │   │   │   ├── index.tsx
│   │   │   │   └── show.tsx
│   │   │   ├── documents
│   │   │   │   ├── index.tsx
│   │   │   │   └── show.tsx
│   │   │   ├── email-templates
│   │   │   │   ├── index.tsx
│   │   │   │   └── show.tsx
│   │   │   ├── errors
│   │   │   │   └── Error.tsx
│   │   │   ├── examples
│   │   │   │   └── chatgpt-demo.tsx
│   │   │   ├── gmail
│   │   │   │   ├── index.tsx
│   │   │   │   └── show.tsx
│   │   │   ├── invoices
│   │   │   │   ├── templates
│   │   │   │   │   ├── Template1.tsx
│   │   │   │   │   ├── Template10.tsx
│   │   │   │   │   ├── Template2.tsx
│   │   │   │   │   ├── Template3.tsx
│   │   │   │   │   ├── Template4.tsx
│   │   │   │   │   ├── Template5.tsx
│   │   │   │   │   ├── Template6.tsx
│   │   │   │   │   ├── Template7.tsx
│   │   │   │   │   ├── Template8.tsx
│   │   │   │   │   └── Template9.tsx
│   │   │   │   ├── index.tsx
│   │   │   │   ├── payment.tsx
│   │   │   │   ├── public.tsx
│   │   │   │   └── show.tsx
│   │   │   ├── Invoices-template
│   │   │   │   └── TemplatePreview.tsx
│   │   │   ├── landing-page
│   │   │   │   ├── components
│   │   │   │   │   ├── AboutUs.tsx
│   │   │   │   │   ├── ContactSection.tsx
│   │   │   │   │   ├── FaqSection.tsx
│   │   │   │   │   ├── FeaturesSection.tsx
│   │   │   │   │   ├── Footer.tsx
│   │   │   │   │   ├── Header.tsx
│   │   │   │   │   ├── HeroSection.tsx
│   │   │   │   │   ├── LivePreview.tsx
│   │   │   │   │   ├── NewsletterSection.tsx
│   │   │   │   │   ├── PlansSection.tsx
│   │   │   │   │   ├── ScreenshotsSection.tsx
│   │   │   │   │   ├── SectionNavigation.tsx
│   │   │   │   │   ├── TeamSection.tsx
│   │   │   │   │   ├── TemplateListItem.tsx
│   │   │   │   │   ├── TemplatePreviewCard.tsx
│   │   │   │   │   ├── TemplatesSection.tsx
│   │   │   │   │   ├── TestimonialsSection.tsx
│   │   │   │   │   └── WhyChooseUs.tsx
│   │   │   │   ├── custom-pages
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── templates
│   │   │   │   │   └── default-sections.ts
│   │   │   │   ├── custom-page.tsx
│   │   │   │   ├── index.tsx
│   │   │   │   ├── settings-about.tsx
│   │   │   │   ├── settings-contact.tsx
│   │   │   │   ├── settings-features.tsx
│   │   │   │   ├── settings-templates.tsx
│   │   │   │   └── settings.tsx
│   │   │   ├── lead-sources
│   │   │   │   └── index.tsx
│   │   │   ├── lead-statuses
│   │   │   │   └── index.tsx
│   │   │   ├── leads
│   │   │   │   ├── index.tsx
│   │   │   │   └── show.tsx
│   │   │   ├── meetings
│   │   │   │   ├── index.tsx
│   │   │   │   └── show.tsx
│   │   │   ├── newsletters
│   │   │   │   └── index.tsx
│   │   │   ├── notification-templates
│   │   │   │   ├── index.tsx
│   │   │   │   └── show.tsx
│   │   │   ├── onboarding
│   │   │   │   ├── company.tsx
│   │   │   │   ├── members.tsx
│   │   │   │   ├── plan.tsx
│   │   │   │   └── roles.tsx
│   │   │   ├── opportunities
│   │   │   │   ├── index.tsx
│   │   │   │   └── show.tsx
│   │   │   ├── opportunity-sources
│   │   │   │   └── index.tsx
│   │   │   ├── opportunity-stages
│   │   │   │   └── index.tsx
│   │   │   ├── permissions
│   │   │   │   └── index.tsx
│   │   │   ├── plans
│   │   │   │   ├── create.tsx
│   │   │   │   ├── edit.tsx
│   │   │   │   ├── form.tsx
│   │   │   │   ├── index.tsx
│   │   │   │   ├── plan-orders.tsx
│   │   │   │   └── plan-request.tsx
│   │   │   ├── products
│   │   │   │   ├── create.tsx
│   │   │   │   ├── edit.tsx
│   │   │   │   ├── index.tsx
│   │   │   │   └── show.tsx
│   │   │   ├── project-tasks
│   │   │   │   ├── index.tsx
│   │   │   │   └── show.tsx
│   │   │   ├── projects
│   │   │   │   ├── gantt.tsx
│   │   │   │   ├── index.tsx
│   │   │   │   ├── kanban.tsx
│   │   │   │   └── show.tsx
│   │   │   ├── purchase-orders
│   │   │   │   ├── index.tsx
│   │   │   │   └── show.tsx
│   │   │   ├── quotes
│   │   │   │   ├── templates
│   │   │   │   │   ├── Template1.tsx
│   │   │   │   │   ├── Template10.tsx
│   │   │   │   │   ├── Template2.tsx
│   │   │   │   │   ├── Template3.tsx
│   │   │   │   │   ├── Template4.tsx
│   │   │   │   │   ├── Template5.tsx
│   │   │   │   │   ├── Template6.tsx
│   │   │   │   │   ├── Template7.tsx
│   │   │   │   │   ├── Template8.tsx
│   │   │   │   │   └── Template9.tsx
│   │   │   │   ├── index.tsx
│   │   │   │   ├── public.tsx
│   │   │   │   └── show.tsx
│   │   │   ├── receipt-orders
│   │   │   │   ├── index.tsx
│   │   │   │   └── show.tsx
│   │   │   ├── referral
│   │   │   │   ├── components
│   │   │   │   │   ├── payout-requests.tsx
│   │   │   │   │   ├── referral-dashboard.tsx
│   │   │   │   │   └── referral-settings.tsx
│   │   │   │   ├── index.tsx
│   │   │   │   └── referred-users.tsx
│   │   │   ├── reports
│   │   │   │   ├── customer-reports.tsx
│   │   │   │   ├── lead-reports.tsx
│   │   │   │   ├── product-reports.tsx
│   │   │   │   ├── project-reports.tsx
│   │   │   │   └── sales-reports.tsx
│   │   │   ├── return-orders
│   │   │   │   ├── index.tsx
│   │   │   │   └── show.tsx
│   │   │   ├── roles
│   │   │   │   └── index.tsx
│   │   │   ├── sales-orders
│   │   │   │   ├── templates
│   │   │   │   │   ├── Template1.tsx
│   │   │   │   │   ├── Template10.tsx
│   │   │   │   │   ├── Template2.tsx
│   │   │   │   │   ├── Template3.tsx
│   │   │   │   │   ├── Template4.tsx
│   │   │   │   │   ├── Template5.tsx
│   │   │   │   │   ├── Template6.tsx
│   │   │   │   │   ├── Template7.tsx
│   │   │   │   │   ├── Template8.tsx
│   │   │   │   │   └── Template9.tsx
│   │   │   │   ├── index.tsx
│   │   │   │   ├── public.tsx
│   │   │   │   └── show.tsx
│   │   │   ├── settings
│   │   │   │   ├── components
│   │   │   │   │   ├── brand-settings.tsx
│   │   │   │   │   ├── cache-settings.tsx
│   │   │   │   │   ├── chatgpt-settings.tsx
│   │   │   │   │   ├── company-system-settings.tsx
│   │   │   │   │   ├── cookie-settings.tsx
│   │   │   │   │   ├── currency-settings.tsx
│   │   │   │   │   ├── email-notification-settings.tsx
│   │   │   │   │   ├── email-settings.tsx
│   │   │   │   │   ├── google-calendar-settings.tsx
│   │   │   │   │   ├── integrations-settings.tsx
│   │   │   │   │   ├── invoice-template-settings.tsx
│   │   │   │   │   ├── payment-settings.tsx
│   │   │   │   │   ├── quote-template-settings.tsx
│   │   │   │   │   ├── recaptcha-settings.tsx
│   │   │   │   │   ├── sales-order-template-settings.tsx
│   │   │   │   │   ├── seo-settings.tsx
│   │   │   │   │   ├── storage-settings.tsx
│   │   │   │   │   ├── stripe-settings.tsx
│   │   │   │   │   ├── system-settings.tsx
│   │   │   │   │   ├── twilio-notification-settings.tsx
│   │   │   │   │   └── webhook-settings.tsx
│   │   │   │   ├── index.tsx
│   │   │   │   └── profile-settings.tsx
│   │   │   ├── shipping-provider-types
│   │   │   │   ├── index.tsx
│   │   │   │   └── show.tsx
│   │   │   ├── superadmin
│   │   │   │   └── dashboard.tsx
│   │   │   ├── target-lists
│   │   │   │   └── index.tsx
│   │   │   ├── task-statuses
│   │   │   │   └── index.tsx
│   │   │   ├── taxes
│   │   │   │   └── index.tsx
│   │   │   ├── users
│   │   │   │   ├── all-logs.tsx
│   │   │   │   ├── index.tsx
│   │   │   │   └── show.tsx
│   │   │   ├── wedding-suppliers
│   │   │   │   ├── index.tsx
│   │   │   │   └── show.tsx
│   │   │   ├── dashboard.tsx
│   │   │   ├── manage-language.tsx
│   │   │   ├── media-library.tsx
│   │   │   └── welcome.tsx
│   │   ├── types
│   │   │   ├── conversations.ts
│   │   │   ├── crud.ts
│   │   │   ├── global.d.ts
│   │   │   ├── index.d.ts
│   │   │   ├── index.ts
│   │   │   ├── vite-env.d.ts
│   │   │   └── wedding-supplier.ts
│   │   ├── utils
│   │   │   ├── authorization.ts
│   │   │   ├── axios-config.ts
│   │   │   ├── columnRenderers.jsx
│   │   │   ├── cookie-utils.ts
│   │   │   ├── crudRenderers.tsx
│   │   │   ├── csrf.ts
│   │   │   ├── currency.ts
│   │   │   ├── echo.ts
│   │   │   ├── ensureRequiredSections.ts
│   │   │   ├── formHelpers.ts
│   │   │   ├── globalSettings.ts
│   │   │   ├── i18n.ts
│   │   │   ├── payment-methods.tsx
│   │   │   ├── payment.ts
│   │   │   ├── performance.ts
│   │   │   ├── permissions.ts
│   │   │   ├── planFeatures.ts
│   │   │   ├── rolePermissions.ts
│   │   │   ├── routes.js
│   │   │   ├── sanitize-html.ts
│   │   │   └── sectionHelpers.ts
│   │   ├── app.tsx
│   │   ├── i18n.js
│   │   └── ssr.tsx
│   ├── lang
│   │   ├── ar
│   │   │   └── installer_messages.php
│   │   ├── de
│   │   │   └── installer_messages.php
│   │   ├── en
│   │   │   └── installer_messages.php
│   │   ├── es
│   │   │   └── installer_messages.php
│   │   ├── et
│   │   │   └── installer_messages.php
│   │   ├── fa
│   │   │   └── installer_messages.php
│   │   ├── fr
│   │   │   └── installer_messages.php
│   │   ├── gr
│   │   │   └── installer_messages.php
│   │   ├── id
│   │   │   └── installer_messages.php
│   │   ├── it
│   │   │   └── installer_messages.php
│   │   ├── nl
│   │   │   └── installer_messages.php
│   │   ├── pl
│   │   │   └── installer_messages.php
│   │   ├── pt
│   │   │   └── installer_messages.php
│   │   ├── pt-br
│   │   │   └── installer_messages.php
│   │   ├── ro
│   │   │   └── installer_messages.php
│   │   ├── ru
│   │   │   └── installer_messages.php
│   │   ├── th
│   │   │   └── installer_messages.php
│   │   ├── tr
│   │   │   └── installer_messages.php
│   │   ├── zh-CN
│   │   │   └── installer_messages.php
│   │   ├── zh-TW
│   │   │   └── installer_messages.php
│   │   ├── ar.json
│   │   ├── da.json
│   │   ├── de.json
│   │   ├── en.json
│   │   ├── es.json
│   │   ├── fr.json
│   │   ├── he.json
│   │   ├── it.json
│   │   ├── ja.json
│   │   ├── language.json
│   │   ├── nl.json
│   │   ├── pl.json
│   │   ├── pt-BR.json
│   │   ├── pt.json
│   │   ├── ru.json
│   │   ├── tr.json
│   │   └── zh.json
│   └── views
│       ├── emails
│       │   ├── error-occurred.blade.php
│       │   ├── layout.blade.php
│       │   ├── notification.blade.php
│       │   ├── team-invitation.blade.php
│       │   └── test.blade.php
│       ├── pdf
│       │   ├── invoice.blade.php
│       │   ├── quote.blade.php
│       │   └── sales_order.blade.php
│       ├── aamarpay-redirect.blade.php
│       └── app.blade.php
├── routes
│   ├── auth.php
│   ├── channels.php
│   ├── console.php
│   ├── settings.php
│   └── web.php
├── storage
│   ├── app
│   │   ├── private
│   │   │   └── .gitignore
│   │   ├── public
│   │   │   └── .gitignore
│   │   └── .gitignore
│   └── installed
├── tests
│   ├── Feature
│   │   ├── Auth
│   │   │   ├── AuthenticationTest.php
│   │   │   ├── EmailVerificationTest.php
│   │   │   ├── PasswordConfirmationTest.php
│   │   │   ├── PasswordResetTest.php
│   │   │   └── RegistrationTest.php
│   │   ├── Settings
│   │   │   ├── PasswordUpdateTest.php
│   │   │   └── ProfileUpdateTest.php
│   │   ├── CampaignValidationTest.php
│   │   ├── DashboardTest.php
│   │   ├── ExampleTest.php
│   │   ├── GmailOAuthTest.php
│   │   ├── ProjectControllerTest.php
│   │   ├── RazorpaySettingsTest.php
│   │   └── StripePaymentTest.php
│   ├── Unit
│   │   └── ExampleTest.php
│   ├── Pest.php
│   └── TestCase.php
├── .editorconfig
├── .gitignore
├── .prettierrc
├── apply_bulk_delete.cjs
├── artisan
├── build_error.txt
├── components.json
├── composer.json
├── composer.lock
├── crm_relationships.md
├── debug_update.php
├── debug_users.php
├── diff_output.txt
├── dump.txt
├── dump2.txt
├── eslint.config.js
├── ev.txt
├── ev4.txt
├── events.txt
├── events2.txt
├── events3.txt
├── extract-translations.php
├── GMAIL_CATEGORIES_IMPLEMENTATION_PROMPT_ACCURATE.md
├── GMAIL_CATEGORIES_IMPLEMENTATION_PROMPT.md
├── hitpay_live_test.php
├── HitPay_Payment_Gateway_Documentation.md
├── index.php
├── leads_sample_11mb.csv
├── package-lock.json
├── package.json
├── parse_pdf.cjs
├── phpunit.xml
├── plans_dump.json
├── raw_diff.txt
├── settings_dump.json
├── SMTP_Email_Analysis.docx
├── test_404.html
├── test_company_users.php
├── test_permissions.php
├── test_stock_deduction.php
├── tmp_log_utf8.txt
├── tmp_log.txt
├── tsconfig.json
├── update_conversations_permissions.php
└── vite.config.ts
```

## Database Tables

| # | Table Name |
|---|---|
| 1 | `users` |
| 2 | `users` |
| 3 | `users` |
| 4 | `password_reset_tokens` |
| 5 | `sessions` |
| 6 | `cache` |
| 7 | `cache` |
| 8 | `cache_locks` |
| 9 | `jobs` |
| 10 | `jobs` |
| 11 | `job_batches` |
| 12 | `failed_jobs` |
| 13 | `landing_page_settings` |
| 14 | `landing_page_settings` |
| 15 | `webhooks` |
| 16 | `webhooks` |
| 17 | `taxes` |
| 18 | `taxes` |
| 19 | `brands` |
| 20 | `brands` |
| 21 | `account_types` |
| 22 | `account_types` |
| 23 | `categories` |
| 24 | `categories` |
| 25 | `account_industries` |
| 26 | `account_industries` |
| 27 | `products` |
| 28 | `products` |
| 29 | `accounts` |
| 30 | `accounts` |
| 31 | `contacts` |
| 32 | `contacts` |
| 33 | `lead_statuses` |
| 34 | `lead_statuses` |
| 35 | `lead_sources` |
| 36 | `lead_sources` |
| 37 | `opportunity_stages` |
| 38 | `opportunity_stages` |
| 39 | `campaign_types` |
| 40 | `campaign_types` |
| 41 | `opportunity_sources` |
| 42 | `opportunity_sources` |
| 43 | `opportunities` |
| 44 | `opportunities` |
| 45 | `target_lists` |
| 46 | `target_lists` |
| 47 | `campaigns` |
| 48 | `campaigns` |
| 49 | `opportunity_products` |
| 50 | `opportunity_products` |
| 51 | `leads` |
| 52 | `leads` |
| 53 | `cases` |
| 54 | `cases` |
| 55 | `shipping_provider_types` |
| 56 | `shipping_provider_types` |
| 57 | `projects` |
| 58 | `projects` |
| 59 | `task_statuses` |
| 60 | `task_statuses` |
| 61 | `project_tasks` |
| 62 | `project_tasks` |
| 63 | `document_folders` |
| 64 | `document_folders` |
| 65 | `document_types` |
| 66 | `document_types` |
| 67 | `documents` |
| 68 | `documents` |
| 69 | `meetings` |
| 70 | `meetings` |
| 71 | `notification_templates` |
| 72 | `notification_templates` |
| 73 | `quotes` |
| 74 | `quotes` |
| 75 | `sales_orders` |
| 76 | `sales_orders` |
| 77 | `meeting_attendees` |
| 78 | `meeting_attendees` |
| 79 | `notification_template_langs` |
| 80 | `notification_template_langs` |
| 81 | `quote_products` |
| 82 | `quote_products` |
| 83 | `sales_order_products` |
| 84 | `sales_order_products` |
| 85 | `user_notification_templates` |
| 86 | `user_notification_templates` |
| 87 | `calls` |
| 88 | `calls` |
| 89 | `invoices` |
| 90 | `invoices` |
| 91 | `call_attendees` |
| 92 | `call_attendees` |
| 93 | `invoice_products` |
| 94 | `invoice_products` |
| 95 | `invoice_activities` |
| 96 | `invoice_activities` |
| 97 | `invoice_comments` |
| 98 | `invoice_comments` |
| 99 | `return_orders` |
| 100 | `return_orders` |
| 101 | `return_order_product` |
| 102 | `return_order_product` |
| 103 | `delivery_orders` |
| 104 | `delivery_orders` |
| 105 | `delivery_order_products` |
| 106 | `delivery_order_products` |
| 107 | `purchase_orders` |
| 108 | `purchase_orders` |
| 109 | `purchase_order_products` |
| 110 | `purchase_order_products` |
| 111 | `purchase_order_activities` |
| 112 | `purchase_order_activities` |
| 113 | `purchase_order_comments` |
| 114 | `purchase_order_comments` |
| 115 | `receipt_orders` |
| 116 | `receipt_orders` |
| 117 | `receipt_order_products` |
| 118 | `receipt_order_products` |
| 119 | `plans` |
| 120 | `plans` |
| 121 | `settings` |
| 122 | `settings` |
| 123 | `coupons` |
| 124 | `coupons` |
| 125 | `plan_requests` |
| 126 | `plan_requests` |
| 127 | `plan_orders` |
| 128 | `plan_orders` |
| 129 | `users` |
| 130 | `users` |
| 131 | `referral_settings` |
| 132 | `referral_settings` |
| 133 | `referrals` |
| 134 | `referrals` |
| 135 | `payout_requests` |
| 136 | `payout_requests` |
| 137 | `currencies` |
| 138 | `currencies` |
| 139 | `payment_settings` |
| 140 | `payment_settings` |
| 141 | `media` |
| 142 | `media` |
| 143 | `media_items` |
| 144 | `media_items` |
| 145 | `email_templates` |
| 146 | `email_templates` |
| 147 | `email_template_langs` |
| 148 | `email_template_langs` |
| 149 | `user_email_templates` |
| 150 | `user_email_templates` |
| 151 | `landing_page_custom_pages` |
| 152 | `landing_page_custom_pages` |
| 153 | `lead_activities` |
| 154 | `lead_activities` |
| 155 | `lead_comments` |
| 156 | `lead_comments` |
| 157 | `quote_activities` |
| 158 | `quote_activities` |
| 159 | `quote_comments` |
| 160 | `quote_comments` |
| 161 | `sales_order_activities` |
| 162 | `sales_order_activities` |
| 163 | `account_activities` |
| 164 | `account_activities` |
| 165 | `account_comments` |
| 166 | `account_comments` |
| 167 | `opportunity_activities` |
| 168 | `opportunity_activities` |
| 169 | `opportunity_comments` |
| 170 | `opportunity_comments` |
| 171 | `invoice_payments` |
| 172 | `invoice_payments` |
| 173 | `contact_messages` |
| 174 | `contact_messages` |
| 175 | `newsletters` |
| 176 | `newsletters` |
| 177 | `login_histories` |
| 178 | `login_histories` |
| 179 | `meetings` |
| 180 | `calls` |
| 181 | `meetings` |
| 182 | `calls` |
| 183 | `project_tasks` |
| 184 | `project_tasks` |
| 185 | `wedding_supplier_categories` |
| 186 | `company_feature_flags` |
| 187 | `wedding_supplier_contacts` |
| 188 | `wedding_suppliers` |
| 189 | `wedding_supplier_categories` |
| 190 | `users` |
| 191 | `users` |
| 192 | `plan_currency_prices` |
| 193 | `plan_currency_prices` |
| 194 | `hitpay_webhook_logs` |
| 195 | `hitpay_webhook_logs` |
| 196 | `users` |
| 197 | `users` |
| 198 | `user_payment_methods` |
| 199 | `user_payment_methods` |
| 200 | `users` |
| 201 | `users` |
| 202 | `invoices` |
| 203 | `invoices` |
| 204 | `plan_orders` |
| 205 | `plan_orders` |
| 206 | `contacts` |
| 207 | `contacts` |
| 208 | `lead_events` |
| 209 | `lead_events` |
| 210 | `ai_classification_results` |
| 211 | `ai_classification_results` |
| 212 | `leads` |
| 213 | `leads` |
| 214 | `social_accounts` |
| 215 | `social_accounts` |
| 216 | `field_mappings` |
| 217 | `field_mappings` |
| 218 | `lead_statuses` |
| 219 | `opportunity_stages` |
| 220 | `opportunity_stages` |
| 221 | `lead_statuses` |
| 222 | `gmail_accounts` |
| 223 | `gmail_accounts` |
| 224 | `email_threads` |
| 225 | `email_threads` |
| 226 | `email_messages` |
| 227 | `email_messages` |
| 228 | `email_threadables` |
| 229 | `email_threadables` |
| 230 | `email_messages` |
| 231 | `email_messages` |
| 232 | `company_roles` |
| 233 | `company_roles` |
| 234 | `gmail_account_activities` |
| 235 | `gmail_account_activities` |
| 236 | `email_messages` |
| 237 | `email_messages` |
| 238 | `gmail_accounts` |
| 239 | `gmail_accounts` |
| 240 | `email_threads` |
| 241 | `email_threads` |
| 242 | `email_thread_assignments` |
| 243 | `email_thread_assignments` |
| 244 | `gmail_accounts` |
| 245 | `gmail_accounts` |
| 246 | `email_messages` |
| 247 | `email_messages` |
| 248 | `email_messages` |
| 249 | `email_messages` |
| 250 | `help/conversations` |
| 251 | `help/conversation_items` |
| 252 | `help/uploads` |
| 253 | `help/canned_replies` |
| 254 | `help/articles` |
| 255 | `help/categories` |
| 256 | `help/category_article` |
| 257 | `help/article_feedback` |
| 258 | `help/triggers` |
| 259 | `help/emails` |
| 260 | `help/profiles` |
| 261 | `help/failed_jobs` |
| 262 | `help/failed_jobs` |
| 263 | `help/search_terms` |
| 264 | `help/search_terms` |
| 265 | `help/purchase_codes` |
| 266 | `help/purchase_codes` |
| 267 | `help/search_terms` |
| 268 | `help/search_terms` |
| 269 | `help/canned_replies` |
| 270 | `help/search_terms` |
| 271 | `help/search_terms` |
| 272 | `help/users` |
| 273 | `help/users` |
| 274 | `help/triggers` |
| 275 | `help/triggers` |
| 276 | `help/tickets` |
| 277 | `help/search_terms` |
| 278 | `help/search_terms` |
| 279 | `help/purchase_codes` |
| 280 | `help/articles` |
| 281 | `help/file_entries` |
| 282 | `help/tickets` |
| 283 | `help/category_article` |
| 284 | `help/purchase_codes` |
| 285 | `help/categories` |
| 286 | `help/categories` |
| 287 | `help/category_article` |
| 288 | `help/page_visits` |
| 289 | `help/page_visits` |
| 290 | `help/conversations` |
| 291 | `help/conversation_items` |
| 292 | `help/groups` |
| 293 | `help/group_user` |
| 294 | `help/agent_settings` |
| 295 | `help/agent_invites` |
| 296 | `help/conversations` |
| 297 | `help/conversations` |
| 298 | `help/canned_replies` |
| 299 | `help/taggables` |
| 300 | `help/triggers` |
| 301 | `help/conversations` |
| 302 | `help/roles` |
| 303 | `help/articles` |
| 304 | `help/attributes` |
| 305 | `help/attributes` |
| 306 | `help/attributables` |
| 307 | `help/attributables` |
| 308 | `help/users` |
| 309 | `help/conversation_views` |
| 310 | `help/conversation_views` |
| 311 | `help/conversations` |
| 312 | `help/conversations` |
| 313 | `help/conversation_statuses` |
| 314 | `help/conversation_statuses` |
| 315 | `help/conversations` |
| 316 | `help/conversations` |
| 317 | `help/conversation_items` |
| 318 | `help/group_user` |
| 319 | `help/conversations` |
| 320 | `help/categories` |
| 321 | `help/categories` |

## API Routes

*(no routes detected — use --deep flag)*

## Controllers

*(no controllers detected — use --deep flag)*

## Models

| File Name | Class Name | Table |
|---|---|---|
| app/Models/Account.php | - | - |
| app/Models/AccountActivity.php | - | - |
| app/Models/AccountComment.php | - | - |
| app/Models/AccountIndustry.php | - | - |
| app/Models/AccountType.php | - | - |
| app/Models/AiClassificationResult.php | - | - |
| app/Models/BaseAuthenticatable.php | - | - |
| app/Models/BaseModel.php | - | - |
| app/Models/BaseSpatiePermission.php | - | - |
| app/Models/BaseSpatieRole.php | - | - |
| app/Models/Brand.php | - | - |
| app/Models/Call.php | - | - |
| app/Models/CallAttendee.php | - | - |
| app/Models/Campaign.php | - | - |
| app/Models/CampaignType.php | - | - |
| app/Models/CaseModel.php | - | cases |
| app/Models/Category.php | - | - |
| app/Models/CompanyFeatureFlag.php | - | - |
| app/Models/Contact.php | - | - |
| app/Models/ContactMessage.php | - | - |
| app/Models/Coupon.php | - | - |
| app/Models/Currency.php | - | - |
| app/Models/DeliveryOrder.php | - | - |
| app/Models/Document.php | - | - |
| app/Models/DocumentFolder.php | - | - |
| app/Models/DocumentType.php | - | - |
| app/Models/EmailMessage.php | - | - |
| app/Models/EmailTemplate.php | - | - |
| app/Models/EmailTemplateLang.php | - | - |
| app/Models/EmailThread.php | - | - |
| app/Models/FieldMapping.php | - | - |
| app/Models/GmailAccount.php | - | - |
| app/Models/GmailAccountActivity.php | - | - |
| app/Models/HitpayWebhookLog.php | - | - |
| app/Models/Invoice.php | - | - |
| app/Models/InvoiceActivity.php | - | - |
| app/Models/InvoiceComment.php | - | - |
| app/Models/InvoicePayment.php | - | - |
| app/Models/LandingPageCustomPage.php | - | - |
| app/Models/LandingPageSetting.php | - | - |
| app/Models/Lead.php | - | - |
| app/Models/LeadActivity.php | - | - |
| app/Models/LeadComment.php | - | - |
| app/Models/LeadEvent.php | - | - |
| app/Models/LeadSource.php | - | - |
| app/Models/LeadStatus.php | - | - |
| app/Models/LoginHistory.php | - | - |
| app/Models/MediaItem.php | - | - |
| app/Models/Meeting.php | - | - |
| app/Models/MeetingAttendee.php | - | - |
| app/Models/Newsletter.php | - | - |
| app/Models/NotificationTemplate.php | - | - |
| app/Models/NotificationTemplateLang.php | - | - |
| app/Models/Opportunity.php | - | - |
| app/Models/OpportunityActivity.php | - | - |
| app/Models/OpportunityComment.php | - | - |
| app/Models/OpportunitySource.php | - | - |
| app/Models/OpportunityStage.php | - | - |
| app/Models/PaymentSetting.php | - | - |
| app/Models/PayoutRequest.php | - | - |
| app/Models/Permission.php | - | - |
| app/Models/Plan.php | - | - |
| app/Models/PlanCurrencyPrice.php | - | - |
| app/Models/PlanOrder.php | - | - |
| app/Models/PlanRequest.php | - | - |
| app/Models/Product.php | - | - |
| app/Models/Project.php | - | - |
| app/Models/ProjectTask.php | - | - |
| app/Models/PurchaseOrder.php | - | - |
| app/Models/PurchaseOrderActivity.php | - | - |
| app/Models/PurchaseOrderComment.php | - | - |
| app/Models/Quote.php | - | - |
| app/Models/QuoteActivity.php | - | - |
| app/Models/QuoteComment.php | - | - |
| app/Models/ReceiptOrder.php | - | - |
| app/Models/Referral.php | - | - |
| app/Models/ReferralSetting.php | - | - |
| app/Models/ReturnOrder.php | - | - |
| app/Models/Role.php | - | - |
| app/Models/SalesOrder.php | - | - |
| app/Models/SalesOrderActivity.php | - | - |
| app/Models/Setting.php | - | - |
| app/Models/ShippingProviderType.php | - | - |
| app/Models/SocialAccount.php | - | - |
| app/Models/TargetList.php | - | - |
| app/Models/TaskStatus.php | - | - |
| app/Models/Tax.php | - | - |
| app/Models/User.php | - | - |
| app/Models/UserEmailTemplate.php | - | - |
| app/Models/UserNotificationTemplate.php | - | - |
| app/Models/UserPaymentMethod.php | - | - |
| app/Models/Webhook.php | - | - |
| app/Models/WeddingSupplier.php | - | - |
| app/Models/WeddingSupplierCategory.php | - | - |
| app/Models/WeddingSupplierContact.php | - | - |
| help/app/Models/User.php | - | - |

## Services

| File Name | Class Name | Public Methods |
|---|---|---|
| app/Services/DynamicStorageService.php | undefined | [object Object], [object Object], [object Object] |
| app/Services/EmailTemplateService.php | undefined | [object Object], [object Object] |
| app/Services/GmailService.php | undefined | [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object] |
| app/Services/GoogleCalendarService.php | undefined | [object Object], [object Object], [object Object], [object Object], [object Object], [object Object], [object Object] |
| app/Services/InvoicePaymentService.php | undefined | [object Object], [object Object], [object Object], [object Object], [object Object] |
| app/Services/MailConfigService.php | undefined | [object Object], [object Object] |
| app/Services/PlanPricingService.php | undefined | [object Object], [object Object], [object Object] |
| app/Services/StorageConfigService.php | undefined | [object Object], [object Object], [object Object], [object Object] |
| app/Services/TwilioService.php | undefined | [object Object] |
| app/Services/UserService.php | undefined | [object Object], [object Object] |
| app/Services/WebhookService.php | undefined | [object Object] |
| app/Services/Omnichannel/ContactMatcherService.php | undefined | [object Object] |
| app/Services/Omnichannel/FacebookLeadAdsService.php | undefined | [object Object] |
| app/Services/Omnichannel/LeadEventTrackerService.php | undefined | [object Object], [object Object] |

## Events & Listeners

| Event Class | Listener Class |
|---|---|
| AccountCreate | - |
| CaseCreated | - |
| GmailSyncCompleted | - |
| InvoiceCreated | - |
| InvoiceStatusChanged | - |
| LeadAssigned | - |
| LeadStatusChanged | - |
| MeetingInvitation | - |
| OpportunityCreated | - |
| OpportunityStageChanged | - |
| QuoteCreated | - |
| QuoteStatusChanged | - |
| SalesOrderCreated | - |
| SalesOrderStatusChanged | - |
| TaskAssigned | - |
| UserCreated | - |
| - | SendAssignLeadEmail |
| - | SendCaseCreatedEmail |
| - | SendInvoiceCreatedEmail |
| - | SendInvoiceStatusChangedEmail |
| - | SendLeadStatusChangedEmail |
| - | SendLeadStatusChangedToLeadEmail |
| - | SendLeadWelcomeEmail |
| - | SendMeetingInvitationEmail |
| - | SendOpportunityCreatedEmail |
| - | SendOpportunityStageChangedEmail |
| - | SendQuoteCreatedEmail |
| - | SendQuoteStatusChangedEmail |
| - | SendSalesOrderCreatedEmail |
| - | SendSalesOrderStatusChangedEmail |
| - | SendTaskAssignedEmail |
| - | SendUserCreatedEmail |
| - | TwilioAccountCreateListener |
| - | TwilioCaseCreateListener |
| - | TwilioLeadCreateListener |
| - | TwilioMettingCreateListener |
| - | TwilioOpportunityCreateListener |
| - | TwilioQuoteCreateListener |
| - | WebhookAssignLeadListener |
| - | WebhookCaseCreateListener |
| - | WebhookMeetingInvitationListener |
| - | WebhookOpportunityCreateListener |
| - | WebhookQuoteCreateListener |
| - | WebhookTaskCreateListener |
| - | WebhookUserCreateListener |

## Authentication

| Guard | Driver |
|---|---|
| guards | session |
| providers | eloquent |
| users | database |

| Provider | Driver |
|---|---|
| web | session |
| users | eloquent |
| Socialite | oauth |

**Middleware:**
- [object Object]
- [object Object]
- [object Object]
- [object Object]
- [object Object]
- [object Object]
- [object Object]
- [object Object]
- [object Object]
- [object Object]
- [object Object]
- [object Object]
- [object Object]

**Features:**
- Spatie Permission (RBAC)
- Login routes defined
- Registration routes defined
- Password reset routes defined
- Invitation-based registration
- Custom BaseAuthenticatable model
- Socialite installed (social auth)
- Email verification required
- Notifications enabled
- User impersonation supported

## Architecture Observations

- ⚠️ Low test coverage: 21 test files for 3021 source files
- 📊 Large codebase: 3021 files, 512,451 lines

---

*Generated by Codebase Scanner v2.0.0*
